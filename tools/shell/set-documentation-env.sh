#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''

declare -A EXISTING_README

##
# Sets markdown file paths array value.
##
setMarkdownFilePathsValue() {
  local TITLE="<< SETTING MARKDOWN FILE PATHS >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT} Readmes:
    ${DEFAULT}%s
    ${DEFAULT}\n" "$TITLE" "${EXISTING_README[@]}"

  COMMA_SEPARATES_STRINGS=$(
    IFS=","
    echo "${EXISTING_README[*]}"
  )
  printf "COMMA_SEPARATES_STRINGS: %s" "$COMMA_SEPARATES_STRINGS"

  find ./apps/documentation/src/environments/ -type f -name "environment.ts" -exec sed -i "s#mdFilePaths.*#mdFilePaths: [$COMMA_SEPARATES_STRINGS],#g" {} +
  find ./apps/documentation/src/environments/ -type f -name "environment.prod.ts" -exec sed -i "s#mdFilePaths.*#mdFilePaths: [$COMMA_SEPARATES_STRINGS],#g" {} +

  source tools/shell/lint.sh "app:documentation" "fix"
}

##
# Reports existing *.md files.
##
reportExistingReadmes() {
  local TITLE="<< README FILES >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT} - execute this script without any parameters to find README files and use found paths to update environment of the Documentation app;
    ${DEFAULT}\n" "$TITLE"

  local KEY
  for KEY in "${!EXISTING_README[@]}"; do printf "
      ${DEFAULT} - ${YELLOW}%s${DEFAULT} = ${LIGHT_GREEN}${EXISTING_README[$KEY]}${DEFAULT}" "${KEY}"; done
  printf "\n"
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
  #for KEY in "${!READMES[@]}"; do printf "
  #  ${DEFAULT} - ${YELLOW}%s${DEFAULT} = ${LIGHT_GREEN}${READMES[$KEY]}${DEFAULT}" "${KEY}"; done
  #printf "\n"

  # debug existing readmes
  #for KEY in "${!EXISTING_README[@]}"; do printf "
  #  ${DEFAULT} - ${YELLOW}%s${DEFAULT} = ${LIGHT_GREEN}${EXISTING_README[$KEY]}${DEFAULT}" "${KEY}"; done
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
