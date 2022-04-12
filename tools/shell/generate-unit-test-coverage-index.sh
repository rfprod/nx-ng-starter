#!/bin/bash

source tools/shell/utils/colors.sh ''
source tools/shell/utils/print-utils.sh ''

PROJECT_ROOT=.

##
# Prints script usage instructions.
##
reportUsage() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/generate-unit-test-coverage-index.sh ?" "print usage"
  printUsageTip "bash tools/shell/generate-unit-test-coverage-index.sh" "generate unit test coverage reports index"
  printGap
}

generateReportIndex() {
  printInfoTitle "<< Generating unit coverage index file >>"
  printGap

  ##
  # Documentation unit coverage reports dist path.
  ##
  local DOCUMENTATION_UNIT_COVERAGE_DIST_PATH
  DOCUMENTATION_UNIT_COVERAGE_DIST_PATH=${PROJECT_ROOT}/dist/apps/documentation/assets/coverage

  if [ ! -d ${DOCUMENTATION_UNIT_COVERAGE_DIST_PATH} ]; then
    printErrorTitle "<< ERROR >>"
    printWarningMessage "You should generate documentation app dist first."
    printGap
    exit 1
  fi

  # Delete index.html file just in case. It should not exist when generating unit coverage index.
  rm -rf "$DOCUMENTATION_UNIT_COVERAGE_DIST_PATH"/index.html

  local CURRENT_DATE
  CURRENT_DATE=$(date)

  ##
  # Find all coverage index.html files and save in array.
  ##
  local COVERAGE_INDEX_FILE_PATHS
  COVERAGE_INDEX_FILE_PATHS=()
  while IFS= read -r -d $'\0'; do
    COVERAGE_INDEX_FILE_PATHS+=("${REPLY//"$DOCUMENTATION_UNIT_COVERAGE_DIST_PATH/"/}") # remove ./dist/documentation/assets/coverage substring from file paths to form correct relative links
  done < <(find "$DOCUMENTATION_UNIT_COVERAGE_DIST_PATH" -maxdepth 5 -name "index.html" -not -path "*/lib/*" -not -path "*/src/*" -not -path "*/mobile/.*" -not -path "*/app" -not -path "*/environments" -print0)

  # To debug found index.html files uncomment next line.
  # for INDEX_FILE_PATH in "${COVERAGE_INDEX_FILE_PATHS[@]}"; do echo "$INDEX_FILE_PATH"; done

  {
    echo '<!DOCTYPE html>'
    echo '<html lang="en">'
    echo '  <head>'
    echo '    <meta charset="utf-8" />'
    echo "    <title>Unit Test Coverage, ${CURRENT_DATE}</title>"
    echo '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.3.0/mdb.min.css">'
    echo "    <meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'; img-src 'self' data: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; font-src 'self'; frame-src 'self'; object-src 'self' blob:; connect-src 'self' ws: wss:; worker-src 'self'\" />"
    echo '  </head>'
    echo '  <body class="container-fluid">'
    echo "    <h1>Unit Test Coverage <sup>${CURRENT_DATE}</sup></h1>"
    echo '    <ul class="list-group list-group-flush">'
    for INDEX_FILE_PATH in "${COVERAGE_INDEX_FILE_PATHS[@]}"; do
      echo "<li class=\"list-group-item\"><a href=\"$INDEX_FILE_PATH\" target=_blank>${INDEX_FILE_PATH//\/index.html/}</a></li>"
    done
    echo '    </ul>'
    echo '    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.3.0/mdb.min.js"></script>'
    echo '  </body>'
    echo '</html>'
  } >"$DOCUMENTATION_UNIT_COVERAGE_DIST_PATH"/index.html

  printSuccessMessage "<< Generated index file >>"
  printGap

  # To debug generated index.html files uncomment next line.
  # cat "$DOCUMENTATION_UNIT_COVERAGE_DIST_PATH"/index.html
}

##
# Script execution control flow.
##
if [ "$1" = "?" ]; then
  reportUsage
else
  generateReportIndex
fi
