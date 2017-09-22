#!/bin/sh

###
### Build script for tci-webintegrator gh-pages branch
###  adapted from https://gohugo.io/hosting-and-deployment/hosting-on-github/

### Get the current directory
###  this will be the /docs folder of the tci-webintegrator repo
DIR=`PWD`

### Move to the parent folder
###  this is the main folder of the tci-webintegrator repo
cd $DIR/..

### Check git status
###  this will abort if there are pending changes in the working directory
if [[ $(git status -s) ]]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

### Delete the old publications
###  Removes all previous worktrees for the public folder
echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

### Switch to the gh-pages branch
echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public origin/gh-pages

### Remove any files that were still existing
echo "Removing existing files"
rm -rf public/*

### Generate the content
echo "Generating site"
cd $DIR
hugo
cp -R public/ ../public/

### Push to GitHub
cd ../public
echo "Updating gh-pages branch"
cd public && git add --all && git commit -m "Publishing to gh-pages"
