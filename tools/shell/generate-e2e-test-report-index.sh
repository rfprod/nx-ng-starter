#!/bin/bash

source tools/shell/utils/colors.sh ''
source tools/shell/utils/print-utils.sh ''
source tools/shell/utils/module-aliases.sh ''

PROJECT_ROOT=.

##
# Prints script usage instructions.
##
reportUsage() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/generate-e2e-test-report-index.sh ?" "print usage"
  printUsageTip "bash tools/shell/generate-e2e-test-report-index.sh" "generate e2e reports index"
  printGap
}

##
# Generate bootstrap script.
##
generateReportIndex() {
  printInfoTitle "<< Generating e2e report index >>"
  printNameAndValue "E2E_DIST_PATH" "$1"

  local E2E_DIST_PATH
  E2E_DIST_PATH="$1"

  if [ ! -d "$E2E_DIST_PATH" ]; then
    printErrorTitle "<< ERROR >>"
    printWarningMessage "You should generate documentation app dist first."
    printGap
  else
    # Delete index.html file just in case. It should not exist when generating unit coverage index.
    rm -rf "$E2E_DIST_PATH"/index.html

    printInfoTitle "<< Files from latest dist >>"
    printGap

    local CURRENT_DATE
    CURRENT_DATE=$(date)

    ##
    # Find all coverage index.html files and save in array.
    ##
    local E2E_INDEX_FILE_PATHS
    E2E_INDEX_FILE_PATHS=()
    while IFS= read -r -d $'\0'; do
      E2E_INDEX_FILE_PATHS+=("${REPLY//"$E2E_DIST_PATH/"/}") # remove ./dist/documentation/assets/cypress substring from file paths to form correct relative links
    done < <(find "$E2E_DIST_PATH" -maxdepth 5 -name "mochawesome.html" -not -path "*/lib/*" -not -path "*/src/*" -not -path "*/mobile/.*" -not -path "*/app" -not -path "*/environments" -print0)

    # To debug found index.html files uncomment next line.
    # for INDEX_FILE_PATH in "${E2E_INDEX_FILE_PATHS[@]}"; do echo "$INDEX_FILE_PATH"; done

    ##
    # Find all video recordings.
    ##
    local VIDEO_RECORDING_FILE_PATHS
    VIDEO_RECORDING_FILE_PATHS=()
    while IFS= read -r -d $'\0'; do
      VIDEO_RECORDING_FILE_PATHS+=("${REPLY//"$E2E_DIST_PATH/"/}") # remove ./dist/documentation/assets/cypress substring from file paths to form correct relative links
    done < <(find "$E2E_DIST_PATH" -maxdepth 5 -name "*.mp4" -print0)

    # To debug found *.mp4 files uncomment next line.
    # for VIDEO_RECORDING_PATH in "${VIDEO_RECORDING_FILE_PATHS[@]}"; do echo "$VIDEO_RECORDING_PATH"; done

    ##
    # Find all screenshots recordings.
    ##
    local SCREENSHOTS_FILE_PATHS
    SCREENSHOTS_FILE_PATHS=()
    while IFS= read -r -d $'\0'; do
      SCREENSHOTS_FILE_PATHS+=("${REPLY//"$E2E_DIST_PATH/"/}") # remove ./dist/documentation/assets/cypress substring from file paths to form correct relative links
    done < <(find "$E2E_DIST_PATH" -maxdepth 5 -name "*.png" -print0)

    # To debug found *.png files uncomment next line.
    # for SCREENSHOTS_FILE_PATH in "${SCREENSHOTS_FILE_PATHS[@]}"; do echo "$SCREENSHOTS_FILE_PATH"; done

    {
      echo '<!DOCTYPE html>'
      echo '<html lang="en">'
      echo '  <head>'
      echo '    <meta charset="utf-8" />'
      echo "    <title>E2E Test Report, ${CURRENT_DATE}</title>"
      echo '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.3.0/mdb.min.css">'
      echo "    <meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'; img-src 'self' data: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; font-src 'self'; frame-src 'self'; object-src 'self' blob:; connect-src 'self' ws: wss:; worker-src 'self'\" />"
      echo '  </head>'
      echo '  <body class="container-fluid">'
      echo "    <h1>E2E Test Report <sup>${CURRENT_DATE}</sup></h1>"
      echo '    <div class="container-fluid">'
      echo '      <p>'
      echo '        <ul class="list-group list-group-flush">'
      for INDEX_FILE_PATH in "${E2E_INDEX_FILE_PATHS[@]}"; do
        echo "<li class=\"list-group-item\"><a href=\"$INDEX_FILE_PATH\" target=_blank>${INDEX_FILE_PATH//\/index.html/}</a></li>"
      done
      echo '        </ul>'
      echo '      </p>'
      echo '      <h3>Video Recordings</h3>'
      echo '      <ul class="list-group list-group-flush">'
      for VIDEO_RECORDING_PATH in "${VIDEO_RECORDING_FILE_PATHS[@]}"; do
        echo "        <li class=\"list-group-item\"><a href=\"$VIDEO_RECORDING_PATH\" target=_blank>${VIDEO_RECORDING_PATH}</a></li>"
      done
      echo '      </ul>'
      echo '      <h3>Screenshots</h3>'
      echo '      <ul class="list-group list-group-flush">'
      for SCREENSHOTS_FILE_PATH in "${SCREENSHOTS_FILE_PATHS[@]}"; do
        echo "        <li class=\"list-group-item\"><a href=\"$SCREENSHOTS_FILE_PATH\" target=_blank>${SCREENSHOTS_FILE_PATH}</a></li>"
      done
      echo '      </ul>'
      echo '    </div>'
      echo '    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.3.0/mdb.min.js"></script>'
      echo '  </body>'
      echo '</html>'
    } >"$E2E_DIST_PATH"/index.html

    printSuccessMessage "<< Generated index file >>"
    printGap

    # To debug generated index.html files uncomment next line.
    # cat "$E2E_DIST_PATH"/index.html
  fi

}

declare -A REPORT_INDEXES=(
  ["documentation"]="${PROJECT_ROOT}"/dist/apps/documentation/assets/cypress
)

generate() {
  for REPORT_INDEX in "${REPORT_INDEXES[@]}"; do
    echo "$REPORT_INDEX"
    generateReportIndex "$REPORT_INDEX"
  done
}

##
# Script execution control flow.
##
if [ "$1" = "?" ]; then
  reportUsage
else
  # generateReportIndex
  generate
fi
