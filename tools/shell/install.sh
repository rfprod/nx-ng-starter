#!/bin/bash

source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

##
# Print help.
##
print_help() {
  print_info_title "<< ${0} usage >>"
  print_usage_tip "bash tools/shell/install.sh ?" "print help"
  print_usage_tip "bash tools/shell/install.sh local" "install project dependencies only"
  print_usage_tip "bash tools/shell/install.sh global" "install global dependencies only"
  print_usage_tip "bash tools/shell/install.sh all" "install projects dependencies, global dependencies, brew (linux), protolint (linux), shellcheck (linux)"
  print_usage_tip "bash tools/shell/install.sh all osx" "install projects dependencies, global dependencies, protolint (osx), shellcheck (osx)"
  print_usage_tip "bash tools/shell/install.sh all linux ci" "install projects dependencies, global dependencies, brew (linux), protolint (linux), shellcheck (linux) in ci environment"
  print_usage_tip "bash tools/shell/install.sh proto" "install protobuf dependencies on linux"
  print_usage_tip "bash tools/shell/install.sh proto osx" "install protobuf dependencies on osx"
  print_usage_tip "bash tools/shell/install.sh proto linux ci" "install protobuf dependencies on linux in ci environment"
  print_usage_tip "bash tools/shell/install.sh shellcheck" "install shellcheck on linux"
  print_usage_tip "bash tools/shell/install.sh shellcheck osx" "install shellcheck on osx"
  print_usage_tip "bash tools/shell/install.sh shellcheck linux ci" "install shellcheck on linux in ci environment"
  print_gap
}

##
# Installs project dependencies.
##
install_project_dependencies() {
  print_info_title "<< Installing project dependencies >>"
  print_gap

  cd ./functions || exit 1
  npm install || exit 1
  cd .. || exit 1
  yarn install --frozen-lockfile || exit 1
}

##
# Installs global npm dependencies.
##
install_global_dependencies() {
  print_info_title "<< Installing global dependencies >>"
  print_gap

  sudo npm install -g @angular/cli@latest @nestjs/cli@latest @ngxs/cli@latest @nrwl/cli@latest typescript@latest @compodoc/compodoc@latest commitizen@latest cz-conventional-changelog@latest clang-format@latest yarn@1.22.22 madge@latest npm-check-updates@latest || exit 1
}

##
# Installs protobuf on Linux.
##
install_protobuf_linux() {
  print_info_title "<< Installing protobuf, protoc-gen-grpc-web, protolint on linux >>"
  print_gap

  if [ "$1" = "ci" ]; then
    apt install -y protobuf-compiler-grpc
  else
    sudo apt install -y protobuf-compiler-grpc
  fi

  wget https://github.com/grpc/grpc-web/releases/download/1.4.2/protoc-gen-grpc-web-1.4.2-linux-x86_64 \
    https://github.com/grpc/grpc-web/releases/download/1.4.2/protoc-gen-grpc-web-1.4.2-linux-x86_64.sha256 \
    -P ~/Downloads

  cd ~/Downloads || exit 1
  sha256sum -c ./protoc-gen-grpc-web-1.4.2-linux-x86_64.sha256 || exit 1

  if [ "$1" = "ci" ]; then
    mv ~/Downloads/protoc-gen-grpc-web-1.4.2-linux-x86_64 \
      /usr/local/bin/protoc-gen-grpc-web
  else
    sudo mv ~/Downloads/protoc-gen-grpc-web-1.4.2-linux-x86_64 \
      /usr/local/bin/protoc-gen-grpc-web
  fi

  chmod -x /usr/local/bin/protoc-gen-grpc-web

  wget https://github.com/yoheimuta/protolint/releases/download/v0.42.2/protolint_0.42.2_Linux_x86_64.tar.gz \
    https://github.com/yoheimuta/protolint/releases/download/v0.42.2/checksums.txt \
    -P ~/Downloads

  cd ~/Downloads || exit 1
  local PROTOLINT_CHECKSUM
  PROTOLINT_CHECKSUM=$(sha256sum protolint_0.42.2_Linux_x86_64.tar.gz)

  local PROTOLINT_CHECKSUM_CHECK
  PROTOLINT_CHECKSUM_CHECK=$(find ./ -type f -name "checksums.txt" -exec grep "${PROTOLINT_CHECKSUM}" {} +)

  if [[ -z "$PROTOLINT_CHECKSUM_CHECK" ]]; then
    print_error_title "Protolint checksum does not match"
    print_gap
    exit 1
  fi

  mkdir ~/Downloads/protolint
  tar -xvzf ~/Downloads/protolint_0.42.2_Linux_x86_64.tar.gz -C ~/Downloads/protolint

  if [ "$1" = "ci" ]; then
    mv ~/Downloads/protolint/protolint \
      /usr/local/bin/protolint
  else
    sudo mv ~/Downloads/protolint/protolint \
      /usr/local/bin/protolint
  fi

  chmod +x /usr/local/bin/protolint

  # protoc-gen-protolint is shipped with protolint, but it looks like it is not needed
  # if [ "$1" = "ci" ]; then
  #   mv ~/Downloads/protolint/protoc-gen-protolint \
  #     /usr/local/bin/protolint
  # else
  #   sudo mv ~/Downloads/protolint/protoc-gen-protolint \
  #     /usr/local/bin/protolint
  # fi
  # chmod +x /usr/local/bin/protoc-gen-protolint

  rm -rf ~/Downloads/protolint_0.42.2_Linux_x86_64.tar.gz ~/Downloads/checksums.txt ~/Downloads/protolint
}

##
# Installs protobuf and gRPC tools on OSX.
##
install_protobuf_osx() {
  print_info_title "<< Installing protobuf, protoc-gen-grpc-web, protolint on osx >>"
  print_gap

  brew install protolint
  brew install protobuf
  brew install protoc-gen-grpc-web --ignore-dependencies
}

##
# Installs protobuf.
##
install_protobuf() {
  if [ "$1" = "osx" ]; then
    install_protobuf_osx
  else
    install_protobuf_linux "$2"
  fi
}

##
# Installs Shellcheck on Linux.
##
install_shellcheck_linux() {
  print_info_title "<< Installing shellcheck on linux >>"
  print_gap

  if [ "$1" = "ci" ]; then
    apt -y install shellcheck
  else
    sudo apt -y install shellcheck
  fi
}

##
# Installs Shellcheck on Osx.
##
install_shellcheck_osx() {
  print_info_title "<< Installing shellcheck on osx >>"
  print_gap

  brew install shellcheck
}

##
# Installs shellcheck.
##
install_shellcheck() {
  if [ "$1" = "osx" ]; then
    install_shellcheck_osx
  else
    install_shellcheck_linux "$2"
  fi
}

##
# Dependencies installation control flow.
##
if [ "$1" = "?" ]; then
  print_help
elif [ "$1" = "all" ]; then
  install_project_dependencies
  install_global_dependencies
  install_protobuf "$2" "$3"
  install_shellcheck "$2" "$3"
elif [ "$1" = "project" ]; then
  install_project_dependencies
elif [ "$1" = "global" ]; then
  install_global_dependencies
elif [ "$1" = "proto" ]; then
  install_protobuf "$2" "$3"
elif [ "$1" = "shellcheck" ]; then
  install_shellcheck "$2" "$3"
else
  print_help
  exit 1
fi
