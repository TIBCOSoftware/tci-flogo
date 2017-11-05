#!/bin/bash

ensure_git() {
  case "${1}" in
      *.git)
          echo "${1}"
          ;;
      *)
          echo "${1}.git"
    ;;
esac
}

ensure_slash() {
  case "${1}" in
      */)
          echo "${1}"
          ;;
      *)
          echo "${1}/"
    ;;
esac
}

fn_exists() {
  [ x$(type -t $1)"" = x"function" ] && return 0 || return 1;
}

common::detect() {
    local BUILD_CICD="LOCAL" # default CICD
    if [[ ( -n "${TRAVIS}" ) && ( "${TRAVIS}" == "true" ) ]]; then
      BUILD_CICD="TRAVIS"
    elif [ -n "${TEAMCITY_VERSION}" ]; then
      BUILD_CICD="TEAMCITY"
    elif [ -f "${HOME}/.wicli" ]; then
        BUILD_CICD="DEV"
    fi
    echo "${BUILD_CICD}"
}

common::envvars() {
  local BUILD_CICD=$(common::detect)
  case "${BUILD_CICD}" in
      TRAVIS)
          if [ -z "${BUILD_NUMBER}" -a -n "${TRAVIS_BUILD_NUMBER}" ]; then
            BUILD_NUMBER=${TRAVIS_BUILD_NUMBER}
          fi
          if [ -z "${BUILD_BRANCH}" -a -n "${TRAVIS_BRANCH}" ]; then
            # When building pull-requests the branch name appears like issue\#4 ,it should be the branch on which
            # pull request was made
            PR="https://api.github.com/repos/${TRAVIS_REPO_SLUG}/pulls/${TRAVIS_PULL_REQUEST}"
            BUILD_BRANCH=$(if [ "${TRAVIS_PULL_REQUEST}" == "false" ]; then echo ${TRAVIS_BRANCH}; else echo `curl -s ${PR} | jq -r .head.ref`; fi)
            # BUILD_BRANCH=${TRAVIS_BRANCH}
            BUILD_BRANCH=$(echo ${BUILD_BRANCH} | tr / .)
          fi
          if [ -z "${BUILD_TYPE_ID}" -a -n "${TRAVIS_BUILD_ID}" ]; then
            BUILD_TYPE_ID=${TRAVIS_BUILD_ID}
          fi
          if [ -z "${BUILD_URL}" -a -n "${TRAVIS_BUILD_ID}" ]; then
            BUILD_URL="https://travis-ci.com/${TRAVIS_REPO_SLUG}/builds/${TRAVIS_BUILD_ID}"
          fi
          if [ -z "${BUILD_GIT_COMMIT}" -a -n "${TRAVIS_COMMIT}" ]; then
            BUILD_GIT_COMMIT=${TRAVIS_COMMIT}
          fi
          if [ -z "${BUILD_GIT_URL}"  ]; then
            giturl=$(git config --get remote.origin.url)
            BUILD_GIT_URL=$(ensure_git ${giturl})
          fi
          if [[ ( -z "${BUILD_RELEASE_TAG}" ) && ( -n "${TRAVIS_TAG}" ) ]]; then
            BUILD_RELEASE_TAG=${TRAVIS_TAG}
          fi
          for i in ${!TRAVIS*}; do eval "echo $i=\$$i"; done;
          ;;
      TEAMCITY)
          if [ -n "${BUILD_NUMBER}"  ]; then
            BUILD_NUMBER=${BUILD_NUMBER}
          fi
          if [ -z "${BUILD_BRANCH}" -a -n "${BRANCH_NAME}" ]; then
            BUILD_BRANCH=${BRANCH_NAME}
          fi
          if [  -n "${BUILD_TYPE_ID}" ]; then
            BUILD_TYPE_ID=${BUILD_TYPE_ID}
          fi
          if [ -z "${BUILD_URL}" -a -n "${BUILD_TYPE_ID}" ]; then
            BUILD_URL="http://llbuild2.na.tibco.com:8080/viewLog.html?buildNumber=${BUILD_NUMBER}&buildTypeId=${BUILD_TYPE_ID}"
          fi
          if [ -z "${BUILD_GIT_COMMIT}" -a -n "${GIT_COMMIT}" ]; then
            BUILD_GIT_COMMIT=${GIT_COMMIT}
          fi
          if [ -z "${BUILD_GIT_URL}"  ]; then
            giturl=$(git config --get remote.origin.url)
            BUILD_GIT_URL=$(ensure_git ${giturl})
          fi
          ;;
      LOCAL)
          if [ -z "${BUILD_NUMBER}" ]; then
            BUILD_NUMBER=${BUILD_NUMBER:-"0"}
          fi
          if [ -z "${BUILD_BRANCH}" ]; then
            BUILD_BRANCH=$(git branch | grep \* | cut -d ' ' -f2)
          fi
          if [ -z "${BUILD_TYPE_ID}"  ]; then
            BUILD_TYPE_ID=${BUILD_TYPE_ID:-""}
          fi
          if [ -z "${BUILD_URL}"  ]; then
            BUILD_URL="localhost/buildNumber=${BUILD_NUMBER}&buildTypeId=${BUILD_TYPE_ID}"
          fi
          if [ -z "${BUILD_GIT_COMMIT}"  ]; then
            BUILD_GIT_COMMIT=$(git rev-parse --short HEAD)
          fi
          if [ -z "${BUILD_GIT_URL}"  ]; then
            giturl=$(git config --get remote.origin.url)
            BUILD_GIT_URL=$(ensure_git ${giturl})
          fi
          if [ -n "${DOCKER_REGISTRY+SET}" ]; then
             echo "Docker registry is set."
          else
             echo "Docker registry is not set."
            # Using private docker registry as default
            # Start your own registry
            # docker run -d -p 5000:5000 --restart=always --name registry registry:2
            # always use / at the end
            DOCKER_REGISTRY="localhost:5000/" 
          fi
          
          ;;
  esac

  echo "BUILD_NUMBER=${BUILD_NUMBER}"
  echo "BUILD_TYPE_ID=${BUILD_TYPE_ID}"
  echo "BUILD_BRANCH=${BUILD_BRANCH}"
  echo "BUILD_GIT_COMMIT=${BUILD_GIT_COMMIT}"
  echo "BUILD_GIT_URL=${BUILD_GIT_URL}"
  echo "DOCKER_REGISTRY=${DOCKER_REGISTRY}"
  if [ -n "${BUILD_RELEASE_TAG+SET}" ]; then
    echo "BUILD_RELEASE_TAG=${BUILD_RELEASE_TAG} was set"
  else
    echo "BUILD_RELEASE_TAG was not set"
  fi

  [ -d "${INIT_ROOT}/.build-cache" ] ||  mkdir -p ${INIT_ROOT}/.build-cache 
  export BUILD_CACHE="${INIT_ROOT}/.build-cache"
}