#!/bin/bash

source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

##
# Reports usage error and exits.
##
reportUsageErrorAndExit() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/generate-elements-bootstrap-script.sh ELEMENTS_APP_DIST_PATH ELEMENTS_APP_PROJECT_NAME" "generates elements app bootstrap script"
  printGap

  exit 1
}

##
# Delete generated bootstrap script if it exists.
##
cleanup() {
  printInfoTitle "<< Cleaning up: removing generated bootstrap script if it exists >>"
  printNameAndValue "bootstrap script file path" "$1"
  printGap

  rm -rf "$1"
  sleep 1
}

##
# Generate bootstrap script.
##
generateBootstrapScript() {
  printInfoTitle "<< Generating element bootstrap script >>"
  printNameAndValue "dist path" "$1"
  printNameAndValue "element project name" "$2"
  printGap

  local BOOTSTRAP_SCRIPT_DIST_PATH="$1/$2"
  local EMELENT_PROJECT_NAME="$2"
  local DIST_INDEX_HTML_PATH="$BOOTSTRAP_SCRIPT_DIST_PATH/index.html"
  local BOOTSTRAP_SCRIPT_FILE_PATH="$BOOTSTRAP_SCRIPT_DIST_PATH/bootstrap.js"

  printNameAndValue "boostrap script file path" "$BOOTSTRAP_SCRIPT_FILE_PATH"
  printGap

  # remove generated boostrap script file if it exists
  cleanup "$BOOTSTRAP_SCRIPT_FILE_PATH"

  printInfoTitle "<< Files from latest dist >>"
  printGap

  # styles bundle
  local STYLES_REF
  STYLES_REF=$(find "$DIST_INDEX_HTML_PATH" -print0 | xargs -0 grep '[^"]*styles[^"]*.css' -o)
  echo "STYLES_REF:" "$STYLES_REF"

  # runtime bundle
  local RUNTIME_REF
  RUNTIME_REF=$(find "$DIST_INDEX_HTML_PATH" -print0 | xargs -0 grep '[^"]*runtime[^"]*.js' -o)
  echo "RUNTIME_REF:" "$RUNTIME_REF"

  # vendor bundle
  local VENDOR_REF
  VENDOR_REF=$(find "$DIST_INDEX_HTML_PATH" -print0 | xargs -0 grep '[^"]*vendor[^"]*.js' -o)
  echo "VENDOR_REF:" "$VENDOR_REF"

  # polyfills bundle
  local POLYFILLS_REF
  POLYFILLS_REF=$(find "$DIST_INDEX_HTML_PATH" -print0 | xargs -0 grep '[^"]*polyfills[^"]*.js' -o)
  echo "POLYFILLS_REF:" "$POLYFILLS_REF"

  # scripts bundle
  local SCRIPTS_REF
  SCRIPTS_REF=$(find "$DIST_INDEX_HTML_PATH" -print0 | xargs -0 grep '[^"]*scripts[^"]*.js' -o || true)
  echo "SCRIPTS_REF:" "$SCRIPTS_REF"

  # main bundle
  local MAIN_REF
  MAIN_REF=$(find "$DIST_INDEX_HTML_PATH" -print0 | xargs -0 grep '[^"]*main[^"]*.js' -o)
  echo "MAIN_REF:" "$MAIN_REF"

  local BOOTSTRAP_SCRIPT=

  BOOTSTRAP_SCRIPT="/**
 * Script usage example:
 *
 *  <script type=\"text/javascript\">
 *      function bootstrapElement() {
 *          var body = document.getElementsByTagName(\"body\")[0];
 *          var script = document.createElement(\"script\");
 *          script.type = \"text/javascript\";
 *          script.src = \"https://nx-ng-starter-elements.web.app/bootstrap.js\";
 *          body.append(script);
 *
 *          var el = document.getElementsByTagName('app-chatbot-root')[0];
 *      }
 *      document.addEventListener(\"DOMContentLoaded\", function() {
 *          console.log('document ready');
 *          bootstrapElement();
 *      });
 *  </script>
 *
 * Custom html element tag that should be added to the html document:
 *
 *  <app-chatbot-root></app-chatbot-root>
 */
(function() {
    console.warn(\"${EMELENT_PROJECT_NAME}: bootstrap\");

    var head = document.getElementsByTagName(\"head\")[0];
    var body = document.getElementsByTagName(\"body\")[0];

    var stylesheetLink = document.createElement(\"link\");
    stylesheetLink.rel = \"stylesheet\";
    stylesheetLink.type = \"text/css\";
    stylesheetLink.href = \"${STYLES_REF}\";

    head.append(stylesheetLink);

    var runtimeScript = document.createElement(\"script\");
    runtimeScript.type = \"text/javascript\";
    runtimeScript.defer = \"true\";
    runtimeScript.src = \"${RUNTIME_REF}\";

    body.append(runtimeScript);

    var vendorScript = document.createElement(\"script\");
    vendorScript.type = \"text/javascript\";
    vendorScript.defer = \"true\";
    vendorScript.src = \"${VENDOR_REF}\";

    body.append(vendorScript);

    var polyfillsScript = document.createElement(\"script\");
    polyfillsScript.type = \"text/javascript\";
    polyfillsScript.defer = \"true\";
    polyfillsScript.src = \"${POLYFILLS_REF}\";

    body.append(polyfillsScript);

    var mainScript = document.createElement(\"script\");
    mainScript.type = \"text/javascript\";
    mainScript.defer = \"true\";
    mainScript.src = \"${MAIN_REF}\";

    body.append(mainScript);
"
  ##
  # Don't include scripts if SCRIPTS_REF is empty.
  ##
  if [ -z "$SCRIPTS_REF" ]; then
    BOOTSTRAP_SCRIPT+="
})();
"
  else
    BOOTSTRAP_SCRIPT+="
    var scriptsScript = document.createElement(\"script\");
    scriptsScript.type = \"text/javascript\";
    scriptsScript.defer = \"true\";
    scriptsScript.async = \"false\";
    scriptsScript.src = \"${SCRIPTS_REF}\";

    body.append(scriptsScript);
})();
"
  fi

  # resulting bootstrap script
  echo "$BOOTSTRAP_SCRIPT" >"$BOOTSTRAP_SCRIPT_FILE_PATH"

  printSuccessTitle "<< Generated Bootstrap Script >>"
  printGap

  cat "$BOOTSTRAP_SCRIPT_FILE_PATH"
}

##
# Check dist existence and proceed.
##
checkDistExistenceAndProceed() {
  printInfoTitle "<< Checking Dist Existence >>"
  printNameAndValue "dist path" "$1"
  printNameAndValue "element project name" "$2"
  printGap

  if [ -d "$1" ]; then
    generateBootstrapScript "$1" "$2"
  else
    printErrorTitle "<< Dist does not exist >>"
    printNameAndValue "dist path" "$1"
    printGap
  fi
}

##
# Widget bootstrap script generation control flow.
##
if [ $# -lt 2 ]; then
  reportUsageErrorAndExit
else
  checkDistExistenceAndProceed "$1" "$2"
fi
