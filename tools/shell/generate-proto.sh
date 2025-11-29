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
# Print help.
##
print_help() {
  print_info_title "<< ${0} usage >>"
  print_usage_tip "bash tools/shell/generate-proto.sh ?" "print help"
  print_usage_tip "bash tools/shell/generate-proto.sh protoc" "generate grpc"
  print_usage_tip "bash tools/shell/generate-proto.sh protobufjs" "generate ts definitions"
  print_gap
}

##
# Reports success.
##
report_success() {
  print_success_title "<< SUCCESS >>"
  print_success_message "libs/proto successfully updated"
  print_gap
}

##
# Runs protoc.
##
run_protoc() {
  local PROTO_FILES="$PROTO_SOURCE_PATH/root.proto
    $PROTO_SOURCE_PATH/common.proto"

  print_info_title "<< RUNNING PROTOC >>"
  print_name_and_value "proto files" "$PROTO_FILES"
  print_gap

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

  print_info_title "<< RUNNING PROTOBUFJS >>"
  print_name_and_value "path to proto" "$PROTO_SOURCE_PATH"
  print_name_and_value "output path" "$OUT_DIR_TS"
  print_name_and_value "path to proto js" "$PATH_TO_PROTO_JS"
  print_name_and_value "path to proto ts" "$PATH_TO_PROTO_TS"
  print_gap

  npm i --no-save pbts-grpc-transcoder --legacy-peer-deps
  git checkout yarn.lock
  node_modules/pbts-grpc-transcoder/node_modules/.bin/pbjs --target static-module --wrap es6 --es6 --force-number --keep-case --no-create --no-encode --no-decode --no-verify --no-delimited --no-beautify -o "$PATH_TO_PROTO_JS" "$PROTO_SOURCE_PATH"/*.proto
  node_modules/pbts-grpc-transcoder/node_modules/.bin/pbts -o "$PATH_TO_PROTO_TS" "$PATH_TO_PROTO_JS"
  ## next run is needed to generate protobufjs library without jsdoc comments
  node_modules/pbts-grpc-transcoder/node_modules/.bin/pbjs --target static-module --wrap es6 --es6 --force-number --keep-case --no-create --no-encode --no-decode --no-verify --no-delimited --no-beautify --no-comments -o "$PATH_TO_PROTO_JS" "$PROTO_SOURCE_PATH"/*.proto

  report_success

  sleep 1
}

##
# Lints libs/proto after regeneration.
##
lint_proto_lib() {
  npx nx lint proto --fix
}

##
# Script control flow.
##
if [ "$1" = "?" ]; then
  print_help
elif [ "$1" == "protoc" ]; then
  run_protoc
  lint_proto_lib
elif [ "$1" == "protobufjs" ]; then
  run_protobufjs
  lint_proto_lib
else
  print_help
  exit 1
fi
