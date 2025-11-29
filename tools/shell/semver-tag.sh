#!/bin/bash

source tools/shell/utils/print-utils.sh ''
source tools/shell/utils/module-aliases.sh ''

##
# Reports usage error and exits.
##
print_help() {
  print_info_title "<< ${0} usage >>"
  print_info_message "version increment exits with error if latest commit is already tagged or if checked out branch is not main"
  print_usage_tip "bash tools/shell/version-increment.sh" "tag latest comment with an appropriate version"
  print_info_message "Custom ruleset based on the https://semver.org specification:"
  print_name_and_value "MAJOR" "changes in one of the applications or a core application library"
  print_name_and_value "MINOR" "changes in one of the feature libraries"
  print_name_and_value "PATCH" "changes in one of the general purpose libraries or other files which do not belong to apps or libs folders"
  print_gap

  exit 1
}

##
# Tag the latest merge commit.
##
set_tag() {
  print_info_title "<< Setting tag >>"
  print_name_and_value "tag" "$1"
  print_gap

  ##
  # Set tag.
  # Optionally comment when debugging script.
  ##
  git tag "$1"

  print_success_title "SUCCESS"
  print_gap
}

##
# Generate next tag based on semver, and set tag.
##
semver_tag() {
  print_info_title "Tagging commit using semver"
  print_gap

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

  print_name_and_value "changed files" "${CHANGED_FILES}"
  print_gap

  if [ -z "$CHANGED_FILES" ]; then
    print_error_title "ERROR: no changed files found in latest commit $COMMIT_HASH in branch"
    print_gap
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

    print_name_and_value "ALL_SEMVER_TAGS" "$ALL_SEMVER_TAGS"
    print_gap

    SEMVERS_ARRAY_INPUT=$(echo "$ALL_SEMVER_TAGS" | tr " " "\n")
    while IFS=' ' read -r line; do SEMVERS_ARRAY+=("$line"); done <<<"$SEMVERS_ARRAY_INPUT"

    local LATEST_SEMVER
    local LATEST_SEMVER_MAJOR
    local LATEST_SEMVER_MINOR
    local LATEST_SEMVER_PATCH

    LATEST_SEMVER=0.0.0
    LATEST_SEMVER_MAJOR=$(printf "%s" "$LATEST_SEMVER" | grep -o "^[0-9]*")                # get initial latest semver major
    LATEST_SEMVER_MINOR=$(printf "%s" "$LATEST_SEMVER" | grep -o "\.[0-9]*\." | tr -d '.') # get initial latest semver minor and remove dots
    LATEST_SEMVER_PATCH=$(printf "%s" "$LATEST_SEMVER" | grep -o "\.[0-9]*$" | tr -d '.')  # get initial latest semver patch and remove dots

    print_info_message "SEMVERS_ARRAY"
    print_gap

    ##
    # Get latest semver parts from SEMVERS_ARRAY
    ##
    for i in "${SEMVERS_ARRAY[@]}"; do
      print_name_and_value "ARRAY_ITEM_SEMVER" "$i"

      local ARRAY_ITEM_SEMVER_MAJOR
      local ARRAY_ITEM_SEMVER_MINOR
      local ARRAY_ITEM_SEMVER_PATCH

      ARRAY_ITEM_SEMVER_MAJOR=$(printf "%s" "$i" | grep -o "^[0-9]*")                # get array item semver major
      ARRAY_ITEM_SEMVER_MINOR=$(printf "%s" "$i" | grep -o "\.[0-9]*\." | tr -d '.') # get array item semver minor and remove dots
      ARRAY_ITEM_SEMVER_PATCH=$(printf "%s" "$i" | grep -o "\.[0-9]*$" | tr -d '.')  # get array item semver patch and remove dots

      print_name_and_value "LATEST_SEMVER_MAJOR" "$LATEST_SEMVER_MAJOR"
      print_name_and_value "LATEST_SEMVER_MINOR" "$LATEST_SEMVER_MINOR"
      print_name_and_value "LATEST_SEMVER_PATCH" "$LATEST_SEMVER_PATCH"
      print_name_and_value "ARRAY_ITEM_SEMVER_MAJOR" "$ARRAY_ITEM_SEMVER_MAJOR"
      print_name_and_value "ARRAY_ITEM_SEMVER_MINOR" "$ARRAY_ITEM_SEMVER_MINOR"
      print_name_and_value "ARRAY_ITEM_SEMVER_PATCH" "$ARRAY_ITEM_SEMVER_PATCH"

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

    print_name_and_value "LATEST_SEMVER_MAJOR" "$LATEST_SEMVER_MAJOR"
    print_name_and_value "LATEST_SEMVER_MINOR" "$LATEST_SEMVER_MINOR"
    print_name_and_value "LATEST_SEMVER_PATCH" "$LATEST_SEMVER_PATCH"
    print_gap

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

    print_name_and_value "CHANGED_FILES_CONTAIN_MAJOR_CHANGES" "${CHANGED_FILES_CONTAIN_MAJOR_CHANGES}"
    print_name_and_value "CHANGED_FILES_CONTAIN_MINOR_CHANGES" "${CHANGED_FILES_CONTAIN_MINOR_CHANGES}"
    print_name_and_value "CHANGED_FILES_CONTAIN_PATCH_CHANGES" "${CHANGED_FILES_CONTAIN_PATCH_CHANGES}"
    print_gap

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
      print_help
    fi

    local TAG
    TAG="${MAJOR}.${MINOR}.${PATCH}"

    set_tag "$TAG"

    print_gap
  fi
}

##
# Check commit tag and proceed.
##
check_commit_tag_and_proceed() {
  print_info_title "<< Checking latest commit tag >>"
  print_name_and_value "latest commit hash" "${1}"
  print_gap

  local COMMIT_TAG
  COMMIT_TAG=$(git tag --points-at "$1") # get tag which points at the latest commit hash

  ##
  # Exit with error if latest commit in given branch is already tagged
  ##
  if [ -n "$COMMIT_TAG" ]; then
    print_help
  fi

  semver_tag
}

##
# Sets versioning format and proceeds.
##
set_versioning_format_and_proceed() {
  print_info_title "<< Setting versioning format and proceeding >>"
  print_name_and_value "checked out branch" "${1}"
  print_gap

  local COMMIT_HASH
  COMMIT_HASH=$(git log --pretty=format:"%h" -n 1) # get latest commit hash in checked out branch

  print_name_and_value "latest commit hash" "$COMMIT_HASH"
  print_gap

  if [ -z "$COMMIT_HASH" ]; then
    print_error_title "ERROR: commit not found in branch ${1}"
    print_gap

    exit 1
  fi

  ##
  # Check which branch is checked out to choose versioning format
  ##
  if [ "$1" = "main" ]; then
    check_commit_tag_and_proceed "$COMMIT_HASH"
  else
    print_help
  fi
}

##
# Tag commit with version in appropriate format.
##
version_tag_commit() {
  print_info_title "<< Tagging commit with version >>"
  print_gap

  local CHECKED_OUT_BRANCH_NAME
  CHECKED_OUT_BRANCH_NAME=$(git branch | grep -o "\*.*")

  local BRANCH_NAME
  BRANCH_NAME="${CHECKED_OUT_BRANCH_NAME//* /}" # remove pattern '* ' to get the branch name only

  print_name_and_value "checked out branch" "$BRANCH_NAME"
  print_gap

  if [ "${BRANCH_NAME}" = "main" ]; then
    set_versioning_format_and_proceed "$BRANCH_NAME"
  else
    print_help
  fi
}

##
# Version increment control flow.
#
# Commits are tagged with a version in the semver format only for the following branches:
# - main
##
version_tag_commit
