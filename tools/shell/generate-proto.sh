#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh
##
# Project aliases.
##
source tools/shell/module-aliases.sh

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
  local TITLE="<< USAGE >>"
  printf "
    ${GREEN} %s\n
    ${DEFAULT} # > ${YELLOW} bash tools/shell/generate-proto.sh${DEFAULT} - generate interfaces for client\n
    \n\n" "$TITLE"
}

reportUsage

##
# Reports success.
##
reportSuccess() {
  local TITLE="<< SUCCESS >>"
  printf "
    ${LIGHT_GREEN}%s\n
    ${DEFAULT} - ${YELLOW}libs/proto${DEFAULT} - successfully updated
    ${DEFAULT}\n" "$TITLE"
}

##
# Runs protobufjs.
##
run_protobufjs() {
  local PATH_TO_PROTO="$PROJECT_ROOT/tools/proto"
  local PATH_TO_INTERFACES="$OUT_DIR_TS"
  local PATH_TO_PROTO_JS="$PATH_TO_INTERFACES/nx-ng-starter_proto.js"
  local PATH_TO_PROTO_TS="$PATH_TO_INTERFACES/nx-ng-starter_proto.d.ts"

  local TITLE="<< RUNNING PROTOBUFJS >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - ${LIGHT_BLUE} path to proto: ${YELLOW}%s
    ${DEFAULT} - ${LIGHT_BLUE} path to interfaces: ${YELLOW}%s
    ${DEFAULT} - ${LIGHT_BLUE} path to proto js: ${YELLOW}%s
    ${DEFAULT} - ${LIGHT_BLUE} path to proto ts: ${YELLOW}%s
    ${DEFAULT}\n" "$TITLE" "$PATH_TO_PROTO" "$PATH_TO_INTERFACES" "$PATH_TO_PROTO_JS" "$PATH_TO_PROTO_TS"

  npx pbjs --target static-module --wrap es6 --es6 --force-number --keep-case --no-create --no-encode --no-decode --no-verify --no-delimited --no-beautify -o "$PATH_TO_PROTO_JS" "$PATH_TO_PROTO"/*.proto
  npx pbts -o "$PATH_TO_PROTO_TS" "$PATH_TO_PROTO_JS"
  ## next run is needed to generate protobufjs library without jsdoc comments
  npx pbjs --target static-module --wrap es6 --es6 --force-number --keep-case --no-create --no-encode --no-decode --no-verify --no-delimited --no-beautify --no-comments -o "$PATH_TO_PROTO_JS" "$PATH_TO_PROTO"/*.proto

  reportSuccess

  sleep 1
}

run_protobufjs

##
# Lints libs/proto after regeneration.
##
lintProtoLib() {
  bash $PROJECT_ROOT/shell/lint.sh "$MODULE_ALIAS_LIB_PROTO" fix
}

lintProtoLib
