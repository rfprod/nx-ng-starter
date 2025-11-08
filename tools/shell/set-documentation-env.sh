#!/bin/bash

source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

declare -A EXISTING_README

##
# Sets markdown file paths array value.
##
set_markdown_file_paths_value() {
  print_info_title "<< SETTING MARKDOWN FILE PATHS >>"
  print_name_and_value "readmes" "${EXISTING_README[@]}"
  print_gap

  COMMA_SEPARATES_STRINGS=$(
    IFS=","
    echo "${EXISTING_README[*]}"
  )

  print_name_and_value "COMMA_SEPARATES_STRINGS" "$COMMA_SEPARATES_STRINGS"

  find ./apps/documentation/src/environments/ -type f -name "environment.ts" -exec sed -i "s#mdFilePaths.*#mdFilePaths: [$COMMA_SEPARATES_STRINGS],#g" {} +
  find ./apps/documentation/src/environments/ -type f -name "environment.prod.ts" -exec sed -i "s#mdFilePaths.*#mdFilePaths: [$COMMA_SEPARATES_STRINGS],#g" {} +

  if [ "$SKIP_FORMAT" != "true" ]; then
    npx nx lint documentation --fix
  fi
}

##
# Reports existing *.md files.
##
report_existing_readmes() {
  print_info_title "<< README FILES >>"
  print_info_message "execute this script without any parameters to find README files and use found paths to update environment of the Documentation app"
  print_gap

  local KEY
  for KEY in "${!EXISTING_README[@]}"; do
    print_name_and_value "${KEY}" "${EXISTING_README[$KEY]}"
  done

  print_gap
}

##
# Finds *.md files in apps/, tools/, and libs/ and updates Documentation environment.
##
find_readmes() {

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
  #   print_name_and_value "${KEY}" "${FOUND_READMES[$KEY]}"
  # done
  #printf "\n"

  # debug existing readmes
  # for KEY in "${!EXISTING_README[@]}"; do
  #   print_name_and_value "${KEY}" "${EXISTING_README[$KEY]}"
  # done
  #printf "\n"

  ##
  # Existing readme files (in apps/ and libs/).
  ##

  if [ "$1" = "?" ]; then
    report_existing_readmes
  else
    set_markdown_file_paths_value "${EXISTING_README[@]}"
  fi
}

find_readmes "$1"
