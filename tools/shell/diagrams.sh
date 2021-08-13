#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''
##
# Printing utils.
##
source tools/shell/print-utils.sh ''

##
# Available diagram names.
##
declare -A DIAGRAMS=(
  ["BRANCHING"]="branching"
  ["MASTER_ON_PUSH"]="master-on-push-pipeline"
  ["PR_VALIDATION"]="pr-validation-pipeline"
)

##
# Reports usage.
##
reportUsage() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/diagrams.sh ?" "print help"
  printUsageTip "bash tools/shell/diagrams.sh" "generate all diagrams"
  printGap
}

DIST_PATH=./dist/diagrams

##
# Generates diagrams.
##
generateDiagrams() {
  printInfoTitle "<< Generating diagrams >>"
  printNameAndValue "dist" "./dist/diagrams"
  printGap

  mkdir "$DIST_PATH" || true

  for DIAGRAM in "${DIAGRAMS[@]}"; do
    printInfoTitle "<< $DIAGRAM >>"

    yarn workspace:mmdc -i ./tools/diagrams/"$DIAGRAM".mmd -o "$DIST_PATH"/"$DIAGRAM".png
  done
}

if [ "$1" = "?" ]; then
  reportUsage
else
  generateDiagrams
fi
