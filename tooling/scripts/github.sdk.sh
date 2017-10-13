#!/bin/sh
# This script has at most 2 dependencies 
#       jq and curl   OR   jq and wget
# This script is meant for quick & easy install via:
#   'curl -sSL https://github.com/TIBCOSoftware/flogo/releases/download/${GITHUB_TAG}/start-flogo.txt | sh'
# or:
#   'wget -qO- https://github.com/TIBCOSoftware/flogo/releases/download/${GITHUB_TAG}/start-flogo.txt | sh'
#

script_root=$(dirname "${BASH_SOURCE}")
command_exists() {
       	command -v "$@" > /dev/null 2>&1
}



checkDependencies() {
    if command_exists curl ; then
       echo "Found curl ..."
    elif command_exists wget; then
        echo "Found wget ..."
    else 
        cat >&2 <<-'EOF'
        Error: this installer needs "curl" or "wget"
        We are unable to find either "curl" or "wget" available to make this happen.
EOF
        exit 1 
    fi
}

throw() {
  echo "$*" >&2
  exit 1
}

BRIEF=0
LEAFONLY=0
PRUNE=0
NO_HEAD=0
NORMALIZE_SOLIDUS=0

awk_egrep () {
  local pattern_string=$1

  gawk '{
    while ($0) {
      start=match($0, pattern);
      token=substr($0, start, RLENGTH);
      print token;
      $0=substr($0, start+RLENGTH);
    }
  }' pattern="$pattern_string"
}

tokenize () {
  local GREP
  local ESCAPE
  local CHAR

  if echo "test string" | egrep -ao --color=never "test" >/dev/null 2>&1
  then
    GREP='egrep -ao --color=never'
  else
    GREP='egrep -ao'
  fi

  if echo "test string" | egrep -o "test" >/dev/null 2>&1
  then
    ESCAPE='(\\[^u[:cntrl:]]|\\u[0-9a-fA-F]{4})'
    CHAR='[^[:cntrl:]"\\]'
  else
    GREP=awk_egrep
    ESCAPE='(\\\\[^u[:cntrl:]]|\\u[0-9a-fA-F]{4})'
    CHAR='[^[:cntrl:]"\\\\]'
  fi

  local STRING="\"$CHAR*($ESCAPE$CHAR*)*\""
  local NUMBER='-?(0|[1-9][0-9]*)([.][0-9]*)?([eE][+-]?[0-9]*)?'
  local KEYWORD='null|false|true'
  local SPACE='[[:space:]]+'

  # Force zsh to expand $A into multiple words
  local is_wordsplit_disabled=$(unsetopt 2>/dev/null | grep -c '^shwordsplit$')
  if [ $is_wordsplit_disabled != 0 ]; then setopt shwordsplit; fi
  $GREP "$STRING|$NUMBER|$KEYWORD|$SPACE|." | egrep -v "^$SPACE$"
  if [ $is_wordsplit_disabled != 0 ]; then unsetopt shwordsplit; fi
}

parse_array () {
  local index=0
  local ary=''
  read -r token
  case "$token" in
    ']') ;;
    *)
      while :
      do
        parse_value "$1" "$index"
        index=$((index+1))
        ary="$ary""$value" 
        read -r token
        case "$token" in
          ']') break ;;
          ',') ary="$ary," ;;
          *) throw "EXPECTED , or ] GOT ${token:-EOF}" ;;
        esac
        read -r token
      done
      ;;
  esac
  [ "$BRIEF" -eq 0 ] && value=$(printf '[%s]' "$ary") || value=
  :
}

parse_object () {
  local key
  local obj=''
  read -r token
  case "$token" in
    '}') ;;
    *)
      while :
      do
        case "$token" in
          '"'*'"') key=$token ;;
          *) throw "EXPECTED string GOT ${token:-EOF}" ;;
        esac
        read -r token
        case "$token" in
          ':') ;;
          *) throw "EXPECTED : GOT ${token:-EOF}" ;;
        esac
        read -r token
        parse_value "$1" "$key"
        obj="$obj$key:$value"        
        read -r token
        case "$token" in
          '}') break ;;
          ',') obj="$obj," ;;
          *) throw "EXPECTED , or } GOT ${token:-EOF}" ;;
        esac
        read -r token
      done
    ;;
  esac
  [ "$BRIEF" -eq 0 ] && value=$(printf '{%s}' "$obj") || value=
  :
}

parse_value () {
  local jpath="${1:+$1,}$2" isleaf=0 isempty=0 print=0
  case "$token" in
    '{') parse_object "$jpath" ;;
    '[') parse_array  "$jpath" ;;
    # At this point, the only valid single-character tokens are digits.
    ''|[!0-9]) throw "EXPECTED value GOT ${token:-EOF}" ;;
    *) value=$token
       # if asked, replace solidus ("\/") in json strings with normalized value: "/"
       [ "$NORMALIZE_SOLIDUS" -eq 1 ] && value=$(echo "$value" | sed 's#\\/#/#g')
       isleaf=1
       [ "$value" = '""' ] && isempty=1
       ;;
  esac
  [ "$value" = '' ] && return
  [ "$NO_HEAD" -eq 1 ] && [ -z "$jpath" ] && return

  [ "$LEAFONLY" -eq 0 ] && [ "$PRUNE" -eq 0 ] && print=1
  [ "$LEAFONLY" -eq 1 ] && [ "$isleaf" -eq 1 ] && [ $PRUNE -eq 0 ] && print=1
  [ "$LEAFONLY" -eq 0 ] && [ "$PRUNE" -eq 1 ] && [ "$isempty" -eq 0 ] && print=1
  [ "$LEAFONLY" -eq 1 ] && [ "$isleaf" -eq 1 ] && \
    [ $PRUNE -eq 1 ] && [ $isempty -eq 0 ] && print=1
  [ "$print" -eq 1 ] && printf "[%s]\t%s\n" "$jpath" "$value"
  :
}

parse () {
  read -r token
  parse_value
  read -r token
  case "$token" in
    '') ;;
    *) throw "EXPECTED EOF GOT $token" ;;
  esac
}

trim() {
    local var="$*"
    var="${var#"${var%%[![:space:]]*}"}"   # remove leading whitespace characters
    var="${var%"${var##*[![:space:]]}"}"   # remove trailing whitespace characters
    echo "$var"
}

getLatestRelease() {
    owner=${1:-"${GITHUB_OWNER}"}
    repo=${2:-"${GITHUB_REPO}"}
    github_url="https://api.github.com/repos/${owner}/${repo}/releases/latest"
    if command_exists jq ; then
      tag_name=$(curl -s "${github_url}" | jq -r '.tag_name' )
    else 
      tag_name=$(curl -s "${github_url}" | tokenize | parse | grep '\["tag_name\"\]' | sed 's/\["\(.*\)"\]\([ ]*\)\(.*\)/\3/g'|sed 's/"//g' )
      tag_name=$(trim $tag_name)
    fi
    if [[ -z "${tag_name}" || "${tag_name}" == "null" ]]; then 
        cat >&2 <<-'EOF'
        Error: "Latest" release not found at https://github.com/TIBCOSoftware/flogo/releases
EOF
        exit 1
    fi
    if command_exists jq ; then
      asset_urls=$(curl -s "${github_url}" | jq -r '.assets[] | .browser_download_url' | grep -E "wi-studio\.tar\.gz|wi-runtime\.tar\.gz")
    else
      asset_urls=$(curl -s "${github_url}" | tokenize | parse |grep 'compose' | grep '\["assets",\d,"browser_download_url"[ \t]*.*'  | sed 's/\["\(.*\)"\]\([ ]*\)\(.*\)/\3/g'|sed 's/"//g')
    fi
    for i in ${asset_urls}; do
    i=$(trim "${i}")

    echo "Downloading ... ${i}"
    download_file "${i}"
    done
}


download_file() {
    file_url="${1}"
    if command_exists curl ; then
        curl -fsSLO "${file_url}"
    elif command_exists wget; then
        wget --no-check-certificate -q -N -O "${file_url##*/}"  "${file_url}"
    fi
}

download_github() {
    checkDependencies
    getLatestRelease "TIBCOSoftware" "tci-webintegrator"
}
# wrapped up in a function so that we have some protection against only getting
# half the file during "curl | sh"
