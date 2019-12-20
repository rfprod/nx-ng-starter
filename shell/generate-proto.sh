#!/bin/bash

##
# Colors:
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE.
##
source shell/colors.sh

##
# Project aliases (confirm the following list in specified shell file, and update hint here when applicable):
#
# Apps
# MODULE_ALIAS_APP_TRANSPORT_V12="app:transport-v12"
# MODULE_ALIAS_APP_TRANSPORT_V12_SSO="app:transport-v12-sso"
# MODULE_ALIAS_APP_TRANSPORT_V12_API="app:transport-v12-api"
#
# Apps E2E
# MODULE_ALIAS_APP_TRANSPORT_V12_E2E="app:transport-v12-e2e"
# MODULE_ALIAS_APP_TRANSPORT_V12_SSO_E2E="app:transport-v12-sso-e2e"
#
# Libs
# MODULE_ALIAS_LIB_TRANSPORT_V12_API_INTERFACE="lib:transport-v12-api-interface"
# MODULE_ALIAS_LIB_TRANSPORT_V12_CORE="lib:transport-v12-core"
# MODULE_ALIAS_LIB_TRANSPORT_V12_ADMIN="lib:transport-v12-admin"
# MODULE_ALIAS_LIB_TRANSPORT_V12_DIRECTORY="lib:transport-v12-directory"
# MODULE_ALIAS_LIB_TRANSPORT_V12_NOTIFICATIONS="lib:transport-v12-notifications"
# MODULE_ALIAS_LIB_TRANSPORT_V12_ORDERS_TABLE="lib:transport-v12-orders-table"
# MODULE_ALIAS_LIB_TRANSPORT_V12_PASSPORT="lib:transport-v12-passport"
# MODULE_ALIAS_LIB_TRANSPORT_V12_PROFILE="lib:transport-v12-profile"
# MODULE_ALIAS_LIB_TRANSPORT_V12_TRACKING="lib:transport-v12-tracking"
# MODULE_ALIAS_LIB_SHARED_CORE="lib:shared-core"
# MODULE_ALIAS_LIB_MOCKS_CORE="lib:mocks-core"
# MODULE_ALIAS_LIB_NOTIFICATIONS_CORE="lib:notifications-core"
# MODULE_ALIAS_LIB_YAMAPS_CORE="lib:yamaps-core"
# MODULE_ALIAS_LIB_PROTO="lib:proto"
##
source shell/module-aliases.sh

##
# Configurable project root, may be useful in CI environment.
##
PROJECT_ROOT=.

##
# Output directory.
##
OUT_DIR_TS=$PROJECT_ROOT/libs/proto/src/lib/interfaces/ts

##
# Reports usage.
##
reportUsage () {
  printf "\n ${GREEN} USAGE${DEFAULT}\n
    ${LIGHT_BLUE}Usage:\n
    ${DEFAULT} # > ${YELLOW} bash shell/generate-proto.sh${DEFAULT} - generate interfaces for client\n
    \n\n"
}

reportUsage

##
# Runs protobufjs.
##
run_protobufjs () {
  PATH_TO_PROTO="$PROJECT_ROOT/tools/proto"
  PATH_TO_INTERFACES="$OUT_DIR_TS"
  PATH_TO_PROTO_JS="$PATH_TO_INTERFACES/nx-ng-starter_proto.js"
  PATH_TO_PROTO_TS="$PATH_TO_INTERFACES/nx-ng-starter_proto.d.ts"

  npx pbjs --target static-module --wrap es6 --es6 --force-number --keep-case -o "$PATH_TO_PROTO_JS" "$PATH_TO_PROTO"/*.proto
  npx pbts -o "$PATH_TO_PROTO_TS" "$PATH_TO_PROTO_JS"
}

run_protobufjs

# lint after regeneration
bash $PROJECT_ROOT/shell/lint.sh $MODULE_ALIAS_LIB_PROTO fix
