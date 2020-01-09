#!/bin/bash

##
# Colors.
##
source shell/colors.sh
##
# Project aliases.
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
reportUsage() {
  TITLE="<< USAGE >>"
  printf "\n ${GREEN} %s ${DEFAULT}\n
    ${LIGHT_BLUE}Usage:\n
    ${DEFAULT} # > ${YELLOW} bash shell/generate-proto.sh${DEFAULT} - generate interfaces for client\n
    \n\n" "$TITLE"
}

reportUsage

##
# Runs protobufjs.
##
run_protobufjs() {
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
