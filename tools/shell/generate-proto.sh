#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''
##
# Project aliases.
##
source tools/shell/module-aliases.sh ''

##
# Project root.
##
PROJECT_ROOT=.

##
# Protobuf source directory.
##
PROTO_SOURCE_PATH=$PROJECT_ROOT/tools/proto

##
# Output directories.
##
OUT_DIR_GRPC=$PROJECT_ROOT/libs/proto/src/lib/interfaces/grpc
OUT_DIR_TS=$PROJECT_ROOT/libs/proto/src/lib/interfaces/ts

##
# Exits with error.
##
exitWithError() {
  exit 1
}

##
# Reports script usage.
##
reportUsage() {
  local TITLE="<< USAGE >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - ${YELLOW} bash tools/shell/generate-proto.sh${DEFAULT} (print generate-proto.sh usage)
    ${DEFAULT} - ${YELLOW} bash tools/shell/generate-proto.sh ?${DEFAULT} (print generate-proto.sh usage, and available colors)
    ${DEFAULT} - ${YELLOW} bash tools/shell/generate-proto.sh protoc${DEFAULT} or ${YELLOW}yarn generate:protoc${DEFAULT} (generate grpc)
    ${DEFAULT} - ${YELLOW} bash tools/shell/generate-proto.sh protobufjs${DEFAULT} or ${YELLOW}yarn generate:protobufjs${DEFAULT} (generate ts definitions)
    ${DEFAULT}\n\n" "$TITLE"
}

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
# Runs protoc.
##
run_protoc() {
  local PROTO_FILES="$PROTO_SOURCE_PATH/root.proto
    $PROTO_SOURCE_PATH/common.proto"

  local TITLE="<< RUNNING PROTOC >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} PROTO_FILES: ${YELLOW}%s
    ${DEFAULT}\n\n" "$TITLE" "$PROTO_FILES"

  # shellcheck disable=SC2086
  protoc -I="$PROTO_SOURCE_PATH" $PROTO_FILES \
    --grpc-web_out="import_style=commonjs+dts,mode=grpcwebtext:$OUT_DIR_GRPC" \
    --js_out="import_style=commonjs:$OUT_DIR_GRPC" || exitWithError
}

##
# Runs protobufjs.
##
run_protobufjs() {
  local PROTO_SOURCE_PATH_JS="$OUT_DIR_TS/nx-ng-starter_proto.js"
  local PROTO_SOURCE_PATH_TS="$OUT_DIR_TS/nx-ng-starter_proto.d.ts"

  local TITLE="<< RUNNING PROTOBUFJS >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - ${LIGHT_BLUE} path to proto: ${YELLOW}%s
    ${DEFAULT} - ${LIGHT_BLUE} path to interfaces: ${YELLOW}%s
    ${DEFAULT} - ${LIGHT_BLUE} path to proto js: ${YELLOW}%s
    ${DEFAULT} - ${LIGHT_BLUE} path to proto ts: ${YELLOW}%s
    ${DEFAULT}\n" "$TITLE" "$PROTO_SOURCE_PATH" "$OUT_DIR_TS" "$PROTO_SOURCE_PATH_JS" "$PROTO_SOURCE_PATH_TS"

  npx pbjs --target static-module --wrap es6 --es6 --force-number --keep-case --no-create --no-encode --no-decode --no-verify --no-delimited --no-beautify -o "$PROTO_SOURCE_PATH_JS" "$PROTO_SOURCE_PATH"/*.proto
  npx pbts -o "$PROTO_SOURCE_PATH_TS" "$PROTO_SOURCE_PATH_JS"
  ## next run is needed to generate protobufjs library without jsdoc comments
  npx pbjs --target static-module --wrap es6 --es6 --force-number --keep-case --no-create --no-encode --no-decode --no-verify --no-delimited --no-beautify --no-comments -o "$PROTO_SOURCE_PATH_JS" "$PROTO_SOURCE_PATH"/*.proto

  reportSuccess

  sleep 1
}

##
# Lints libs/proto after regeneration.
##
lintProtoLib() {
  bash $PROJECT_ROOT/tools/shell/lint.sh "$MODULE_ALIAS_LIB_PROTO" fix
}

##
# Proto generation control flow.
##
if [ $# -ne 1 ]; then
  reportUsage
elif [ "$1" == "protoc" ]; then
  run_protoc
  lintProtoLib
elif [ "$1" == "protobufjs" ]; then
  run_protobufjs
  lintProtoLib
else
  reportUsage
fi
