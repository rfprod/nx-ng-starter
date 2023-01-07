#!/bin/bash

source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

declare -A EXISTING_README

##
# Sets markdown file paths array value.
##
setMarkdownFilePathsValue() {
  printInfoTitle "<< SETTING MARKDOWN FILE PATHS >>"
  printNameAndValue "readmes" "${EXISTING_README[@]}"
  printGap

  COMMA_SEPARATES_STRINGS=$(
    IFS=","
    echo "${EXISTING_README[*]}"
  )

  printNameAndValue "COMMA_SEPARATES_STRINGS" "$COMMA_SEPARATES_STRINGS"

  find ./apps/documentation/src/environments/ -type f -name "environment.ts" -exec sed -i "s#mdFilePaths.*#mdFilePaths: [$COMMA_SEPARATES_STRINGS],#g" {} +
  find ./apps/documentation/src/environments/ -type f -name "environment.prod.ts" -exec sed -i "s#mdFilePaths.*#mdFilePaths: [$COMMA_SEPARATES_STRINGS],#g" {} +

  source tools/shell/lint.sh "app:documentation" "fix"
}

##
# Reports existing *.md files.
##
reportExistingReadmes() {
  printInfoTitle "<< README FILES >>"
  printInfoMessage "execute this script without any parameters to find README files and use found paths to update environment of the Documentation app"
  printGap

  local KEY
  for KEY in "${!EXISTING_README[@]}"; do
    printNameAndValue "${KEY}" "${EXISTING_README[$KEY]}"
  done

  printGap
}

##
# Finds *.md files in apps/, tools/, and libs/ and updates Documentation environment.
##
findReadmes() {

  readarray -d '' FOUND_READMES < <(find apps/ libs/ tools/ -type f -name "*.md" -print0)

  for README in "${FOUND_READMES[@]}"; do
    local README_NAME
    README_NAME="${README//\//:}"
    # debug found readmes 1
    #echo "name: $README_NAME"
    #echo "value: $README"
    #READMES["$README_NAME"]="$README"
    EXISTING_README["$README_NAME"]="'$README'"
  done

  # debug found readmes 2
  # for KEY in "${!FOUND_READMES[@]}"; do
  #   printNameAndValue "${KEY}" "${FOUND_READMES[$KEY]}"
  # done
  #printf "\n"

  # debug existing readmes
  # for KEY in "${!EXISTING_README[@]}"; do
  #   printNameAndValue "${KEY}" "${EXISTING_README[$KEY]}"
  # done
  #printf "\n"

  ##
  # Existing readme files (in apps/ and libs/).
  ##

  if [ "$1" = "?" ]; then
    reportExistingReadmes
  else
    setMarkdownFilePathsValue "${EXISTING_README[@]}"
  fi
}

findReadmes "$1"
