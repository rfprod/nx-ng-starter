#!/bin/bash

source tools/shell/utils/module-aliases.sh ''
source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

##
# Project root reference.
##
PROJECT_ROOT=.
##
# Protobuf source directory.
##
PROTO_SOURCE_PATH=$PROJECT_ROOT/tools/proto
##
# Output directories.
##
OUT_DIR_GRPC=$PROJECT_ROOT/libs/proto/src/lib/grpc
OUT_DIR_TS=$PROJECT_ROOT/libs/proto/src/lib/ts

##
# Reports script usage.
##
reportUsage() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/generate-proto.sh" "print generate-proto.sh usage"
  printUsageTip "bash tools/shell/generate-proto.sh protoc" "generate grpc"
  printUsageTip "bash tools/shell/generate-proto.sh protobufjs" "generate ts definitions"
  printGap

  exit 1
}

##
# Reports success.
##
reportSuccess() {
  printSuccessTitle "<< SUCCESS >>"
  printSuccessMessage "libs/proto successfully updated"
  printGap
}

##
# Runs protoc.
##
run_protoc() {
  local PROTO_FILES="$PROTO_SOURCE_PATH/root.proto
    $PROTO_SOURCE_PATH/common.proto"

  printInfoTitle "<< RUNNING PROTOC >>"
  printNameAndValue "proto files" "$PROTO_FILES"
  printGap

  # shellcheck disable=SC2086
  protoc -I="$PROTO_SOURCE_PATH" $PROTO_FILES \
    --grpc-web_out="import_style=commonjs+dts,mode=grpcwebtext:$OUT_DIR_GRPC" \
    --js_out="import_style=commonjs:$OUT_DIR_GRPC" || exit 1
}

##
# Runs protobufjs.
##
run_protobufjs() {
  local PATH_TO_PROTO_JS="$OUT_DIR_TS/nx-ng-starter_proto.js"
  local PATH_TO_PROTO_TS="$OUT_DIR_TS/nx-ng-starter_proto.d.ts"

  printInfoTitle "<< RUNNING PROTOBUFJS >>"
  printNameAndValue "path to proto" "$PROTO_SOURCE_PATH"
  printNameAndValue "output path" "$OUT_DIR_TS"
  printNameAndValue "path to proto js" "$PATH_TO_PROTO_JS"
  printNameAndValue "path to proto ts" "$PATH_TO_PROTO_TS"
  printGap

  npm i --no-save pbts-grpc-transcoder --legacy-peer-deps
  git checkout yarn.lock
  node_modules/pbts-grpc-transcoder/node_modules/.bin/pbjs --target static-module --wrap es6 --es6 --force-number --keep-case --no-create --no-encode --no-decode --no-verify --no-delimited --no-beautify -o "$PATH_TO_PROTO_JS" "$PROTO_SOURCE_PATH"/*.proto
  node_modules/pbts-grpc-transcoder/node_modules/.bin/pbts -o "$PATH_TO_PROTO_TS" "$PATH_TO_PROTO_JS"
  ## next run is needed to generate protobufjs library without jsdoc comments
  node_modules/pbts-grpc-transcoder/node_modules/.bin/pbjs --target static-module --wrap es6 --es6 --force-number --keep-case --no-create --no-encode --no-decode --no-verify --no-delimited --no-beautify --no-comments -o "$PATH_TO_PROTO_JS" "$PROTO_SOURCE_PATH"/*.proto

  reportSuccess

  sleep 1
}

##
# Lints libs/proto after regeneration.
##
lintProtoLib() {
  npx nx lint proto --fix
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
