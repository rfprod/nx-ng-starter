#!/bin/bash

source tools/shell/utils/print-utils.sh ''
source tools/shell/utils/module-aliases.sh ''

##
# Reports usage error and exits.
##
reportUsageErrorAndExit() {
  printInfoTitle "<< ${0} usage >>"
  printInfoMessage "version increment exits with error if latest commit is already tagged or if checked out branch is not main"
  printUsageTip "bash tools/shell/version-increment.sh" "tag latest comment with an appropriate version"
  printInfoMessage "Custom ruleset based on the https://semver.org specification:"
  printNameAndValue "MAJOR" "changes in one of the applications or a core application library"
  printNameAndValue "MINOR" "changes in one of the feature libraries"
  printNameAndValue "PATCH" "changes in one of the general purpose libraries or other files which do not belong to apps or libs folders"
  printGap

  exit 1
}

##
# Tag the latest merge commit.
##
setTag() {
  printInfoTitle "<< Setting tag >>"
  printNameAndValue "tag" "$1"
  printGap

  ##
  # Set tag.
  # Optionally comment when debugging script.
  ##
  git tag "$1"

  printSuccessTitle "SUCCESS"
  printGap
}

##
# Generate next tag based on semver, and set tag.
##
semverTag() {
  printInfoTitle "Tagging commit using semver"
  printGap

  local CHANGED_FILES
  # Get changed files
  # CHANGED_FILES=$(git log --pretty=format:"" --no-merges --name-only -n 1) # get changed files in the latest commit in the given branch
  CHANGED_FILES=$(git log "$(git describe --tags --abbrev=0)"..HEAD --oneline --pretty=format:"" --no-merges --name-only) # get changed files since latest tag
  ##
  # Dummy changed files with with real files list for testing
  ##
  #CHANGED_FILES="apps/client/src/app/index.html\nlibs/client-core/src/app/index.html\nlibs/something-else/src/lib/index.html" # major changes mock
  #CHANGED_FILES="libs/client-chatbot/src/app/index.html\nlibs/backend-grpc/src/app/index.html\nlibs/client-store/src/lib/index.html" # minor changes mock
  #CHANGED_FILES="package.json" # patch changes mock

  printNameAndValue "changed files" "${CHANGED_FILES}"
  printGap

  if [ -z "$CHANGED_FILES" ]; then
    printErrorTitle "ERROR: no changed files found in latest commit $COMMIT_HASH in branch"
    printGap
    exit 1
  else
    local ALL_TAGS
    local ALL_SEMVER_TAGS
    local SEMVERS_ARRAY_INPUT
    # Get git tags
    ALL_TAGS=$(git tag --sort=creatordate 2>&1) # use command 'git tag -l <pattern>' later when repo has tags so that it can be tested debugged

    ##
    # Dummy tags list for testing
    ##
    #ALL_TAGS=$(printf "0.0.1\n0.1.0\n1.0.0\n10.1.0\n10.1.1\n10.2.0\n11.0.0\nRELEASE-1111.11.11\n")

    ALL_SEMVER_TAGS=$(printf "%s" "$ALL_TAGS" | grep -o "^[0-9]*\.[0-9]*\.[0-9]*")

    ##
    # If no semver tags were found, initialize ALL_SEMVER_TAGS with a value 0.0.0
    ##
    if [ -z "$ALL_SEMVER_TAGS" ]; then
      ALL_SEMVER_TAGS="0.0.0"
    fi

    printNameAndValue "ALL_SEMVER_TAGS" "$ALL_SEMVER_TAGS"
    printGap

    SEMVERS_ARRAY_INPUT=$(echo $ALL_SEMVER_TAGS | tr " " "\n")
    while IFS=' ' read -r line; do SEMVERS_ARRAY+=("$line"); done <<<"$SEMVERS_ARRAY_INPUT"

    local LATEST_SEMVER
    local LATEST_SEMVER_MAJOR
    local LATEST_SEMVER_MINOR
    local LATEST_SEMVER_PATCH

    LATEST_SEMVER=0.0.0
    LATEST_SEMVER_MAJOR=$(printf "%s" "$LATEST_SEMVER" | grep -o "^[0-9]*")                # get initial latest semver major
    LATEST_SEMVER_MINOR=$(printf "%s" "$LATEST_SEMVER" | grep -o "\.[0-9]*\." | tr -d '.') # get initial latest semver minor and remove dots
    LATEST_SEMVER_PATCH=$(printf "%s" "$LATEST_SEMVER" | grep -o "\.[0-9]*$" | tr -d '.')  # get initial latest semver patch and remove dots

    printInfoMessage "SEMVERS_ARRAY"
    printGap

    ##
    # Get latest semver parts from SEMVERS_ARRAY
    ##
    for i in "${SEMVERS_ARRAY[@]}"; do
      printNameAndValue "ARRAY_ITEM_SEMVER" "$i"

      local ARRAY_ITEM_SEMVER_MAJOR
      local ARRAY_ITEM_SEMVER_MINOR
      local ARRAY_ITEM_SEMVER_PATCH

      ARRAY_ITEM_SEMVER_MAJOR=$(printf "%s" "$i" | grep -o "^[0-9]*")                # get array item semver major
      ARRAY_ITEM_SEMVER_MINOR=$(printf "%s" "$i" | grep -o "\.[0-9]*\." | tr -d '.') # get array item semver minor and remove dots
      ARRAY_ITEM_SEMVER_PATCH=$(printf "%s" "$i" | grep -o "\.[0-9]*$" | tr -d '.')  # get array item semver patch and remove dots

      printNameAndValue "LATEST_SEMVER_MAJOR" "$LATEST_SEMVER_MAJOR"
      printNameAndValue "LATEST_SEMVER_MINOR" "$LATEST_SEMVER_MINOR"
      printNameAndValue "LATEST_SEMVER_PATCH" "$LATEST_SEMVER_PATCH"
      printNameAndValue "ARRAY_ITEM_SEMVER_MAJOR" "$ARRAY_ITEM_SEMVER_MAJOR"
      printNameAndValue "ARRAY_ITEM_SEMVER_MINOR" "$ARRAY_ITEM_SEMVER_MINOR"
      printNameAndValue "ARRAY_ITEM_SEMVER_PATCH" "$ARRAY_ITEM_SEMVER_PATCH"

      if [ $((LATEST_SEMVER_PATCH + 0)) -lt $((ARRAY_ITEM_SEMVER_PATCH + 0)) ]; then
        LATEST_SEMVER_MAJOR=$ARRAY_ITEM_SEMVER_MAJOR
        LATEST_SEMVER_MINOR=$ARRAY_ITEM_SEMVER_MINOR
        LATEST_SEMVER_PATCH=$ARRAY_ITEM_SEMVER_PATCH
      fi

      if [ $((LATEST_SEMVER_MINOR + 0)) -lt $((ARRAY_ITEM_SEMVER_MINOR + 0)) ]; then
        LATEST_SEMVER_MAJOR=$ARRAY_ITEM_SEMVER_MAJOR
        LATEST_SEMVER_MINOR=$ARRAY_ITEM_SEMVER_MINOR
        LATEST_SEMVER_PATCH=0
      fi

      if [ $((LATEST_SEMVER_MAJOR + 0)) -lt $((ARRAY_ITEM_SEMVER_MAJOR + 0)) ]; then
        LATEST_SEMVER_MAJOR=$ARRAY_ITEM_SEMVER_MAJOR
        LATEST_SEMVER_MINOR=0
        LATEST_SEMVER_PATCH=0
      fi
    done

    printNameAndValue "LATEST_SEMVER_MAJOR" "$LATEST_SEMVER_MAJOR"
    printNameAndValue "LATEST_SEMVER_MINOR" "$LATEST_SEMVER_MINOR"
    printNameAndValue "LATEST_SEMVER_PATCH" "$LATEST_SEMVER_PATCH"
    printGap

    ##
    # Initialize new semver parts with latest found.
    ##
    local MAJOR
    MAJOR=$LATEST_SEMVER_MAJOR
    local MINOR
    MINOR=$LATEST_SEMVER_MINOR
    local PATCH
    PATCH=$LATEST_SEMVER_PATCH

    ##
    # Check which files have changed to apply increment to latest found semver.
    # - MAJOR: matches frontend and backend apps, and core libs
    # - MINOR: excludes previous MAJOR matches, and matches all other apps and libs
    # - PATCH: excludes MAJOR and MINOR matches, and matches everything else
    ##
    local CHANGED_FILES_CONTAIN_MAJOR_CHANGES
    CHANGED_FILES_CONTAIN_MAJOR_CHANGES=$(printf "%s" "$CHANGED_FILES" | grep -o "angular\.json\|nx\.json\|apps\/api\/.*\|apps\/client\/.*\|apps\/elements\/.*\|apps\/elements-testing\/.*\|apps\/documentation\/.*\|libs\/backend-core\/.*\|libs\/client-core\/.*")
    local CHANGED_FILES_CONTAIN_MINOR_CHANGES
    CHANGED_FILES_CONTAIN_MINOR_CHANGES=$(printf "%s" "$CHANGED_FILES" | grep -v "angular\.json\|nx\.json\|apps\/api\/.*\|apps\/client\/.*\|apps\/elements\/.*\|apps\/elements-testing\/.*\|apps\/documentation\/.*\|libs\/backend-core\/.*\|libs\/client-core\/.*" | grep -o "apps\/.*\|libs\/.*")
    local CHANGED_FILES_CONTAIN_PATCH_CHANGES
    CHANGED_FILES_CONTAIN_PATCH_CHANGES=$(printf "%s" "$CHANGED_FILES" | grep -v "angular\.json\|nx\.json\|apps\/api\/.*\|apps\/client\/.*\|apps\/elements\/.*\|apps\/elements-testing\/.*\|apps\/documentation\/.*\|libs\/backend-core\/.*\|libs\/client-core\/.*\|apps\/.*\|libs\/.*" | grep -o ".*")

    printNameAndValue "CHANGED_FILES_CONTAIN_MAJOR_CHANGES" "${CHANGED_FILES_CONTAIN_MAJOR_CHANGES}"
    printNameAndValue "CHANGED_FILES_CONTAIN_MINOR_CHANGES" "${CHANGED_FILES_CONTAIN_MINOR_CHANGES}"
    printNameAndValue "CHANGED_FILES_CONTAIN_PATCH_CHANGES" "${CHANGED_FILES_CONTAIN_PATCH_CHANGES}"
    printGap

    ##
    # Increment new semver parts depending on changed files.
    ##
    if [ -n "$CHANGED_FILES_CONTAIN_MAJOR_CHANGES" ]; then
      MAJOR=$((MAJOR + 1))
      MINOR=0
      PATCH=0
    elif [ -n "$CHANGED_FILES_CONTAIN_MINOR_CHANGES" ]; then
      MINOR=$((MINOR + 1))
      PATCH=0
    elif [ -n "$CHANGED_FILES_CONTAIN_PATCH_CHANGES" ]; then
      PATCH=$((PATCH + 1))
    else
      reportUsageErrorAndExit
    fi

    local TAG
    TAG="${MAJOR}.${MINOR}.${PATCH}"

    setTag $TAG

    printGap
  fi
}

##
# Check commit tag and proceed.
##
checkCommitTagAndProceed() {
  printInfoTitle "<< Checking latest commit tag >>"
  printNameAndValue "latest commit hash" "${1}"
  printGap

  local COMMIT_TAG
  COMMIT_TAG=$(git tag --points-at "$1") # get tag which points at the latest commit hash

  ##
  # Exit with error if latest commit in given branch is already tagged
  ##
  if [ -n "$COMMIT_TAG" ]; then
    reportUsageErrorAndExit
  fi

  semverTag
}

##
# Sets versioning format and proceeds.
##
setVersioningFormatAndProceed() {
  printInfoTitle "<< Setting versioning format and proceeding >>"
  printNameAndValue "checked out branch" "${1}"
  printGap

  local COMMIT_HASH
  COMMIT_HASH=$(git log --pretty=format:"%h" -n 1) # get latest commit hash in checked out branch

  printNameAndValue "latest commit hash" "$COMMIT_HASH"
  printGap

  if [ -z "$COMMIT_HASH" ]; then
    printErrorTitle "ERROR: commit not found in branch ${1}"
    printGap

    exit 1
  fi

  ##
  # Check which branch is checked out to choose versioning format
  ##
  if [ "$1" = "main" ]; then
    checkCommitTagAndProceed "$COMMIT_HASH"
  else
    reportUsageErrorAndExit
  fi
}

##
# Tag commit with version in appropriate format.
##
versionTagCommit() {
  printInfoTitle "<< Tagging commit with version >>"
  printGap

  local CHECKED_OUT_BRANCH_NAME
  CHECKED_OUT_BRANCH_NAME=$(git branch | grep -o "\*.*")

  local BRANCH_NAME
  BRANCH_NAME="${CHECKED_OUT_BRANCH_NAME//* /}" # remove pattern '* ' to get the branch name only

  printNameAndValue "checked out branch" "$BRANCH_NAME"
  printGap

  if [ "${BRANCH_NAME}" = "main" ]; then
    setVersioningFormatAndProceed "$BRANCH_NAME"
  else
    reportUsageErrorAndExit
  fi
}

##
# Version increment control flow.
#
# Commits are tagged with a version in the semver format only for the following branches:
# - main
##
versionTagCommit
