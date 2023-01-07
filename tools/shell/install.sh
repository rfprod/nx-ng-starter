#!/bin/bash

source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

##
# Reports usage error and exits.
##
reportUsage() {
  printInfoTitle "<< ${0} usage >>"
  printUsageTip "bash tools/shell/install.sh" "print help"
  printUsageTip "bash tools/shell/install.sh local" "install project dependencies only"
  printUsageTip "bash tools/shell/install.sh global" "install global dependencies only"
  printUsageTip "bash tools/shell/install.sh all" "install projects dependencies, global dependencies, brew (linux), protolint (linux), shellcheck (linux)"
  printUsageTip "bash tools/shell/install.sh all osx" "install projects dependencies, global dependencies, protolint (osx), shellcheck (osx)"
  printUsageTip "bash tools/shell/install.sh all linux ci" "install projects dependencies, global dependencies, brew (linux), protolint (linux), shellcheck (linux) in ci environment"
  printUsageTip "bash tools/shell/install.sh proto" "install protobuf dependencies on linux"
  printUsageTip "bash tools/shell/install.sh proto osx" "install protobuf dependencies on osx"
  printUsageTip "bash tools/shell/install.sh proto linux ci" "install protobuf dependencies on linux in ci environment"
  printUsageTip "bash tools/shell/install.sh shellcheck" "install shellcheck on linux"
  printUsageTip "bash tools/shell/install.sh shellcheck osx" "install shellcheck on osx"
  printUsageTip "bash tools/shell/install.sh shellcheck linux ci" "install shellcheck on linux in ci environment"
  printGap
}

##
# Installs project dependencies.
##
installProjectDependencies() {
  printInfoTitle "<< Installing project dependencies >>"
  printGap

  cd ./functions || exit 1
  npm install || exit 1
  cd .. || exit 1
  yarn install --frozen-lockfile || exit 1
}

##
# Installs global npm dependencies.
##
installGlobalDependencies() {
  printInfoTitle "<< Installing global dependencies >>"
  printGap

  sudo npm install -g @angular/cli@latest @nestjs/cli@latest @ngxs/cli@latest @nrwl/cli@latest typescript@latest @compodoc/compodoc@latest commitizen@latest cz-conventional-changelog@latest clang-format@latest yarn@1.22.19 madge@latest npm-check-updates@latest || exit 1
}

##
# Installs protobuf on Linux.
##
installProtobufLinux() {
  printInfoTitle "<< Installing protobuf, protoc-gen-grpc-web, protolint on linux >>"
  printGap

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
    printErrorTitle "Protolint checksum does not match"
    printGap
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
installProtobufOsx() {
  printInfoTitle "<< Installing protobuf, protoc-gen-grpc-web, protolint on osx >>"
  printGap

  brew install protolint
  brew install protobuf
  brew install protoc-gen-grpc-web --ignore-dependencies
}

##
# Installs protobuf.
##
installProtobuf() {
  if [ "$1" = "osx" ]; then
    installProtobufOsx
  else
    installProtobufLinux "$2"
  fi
}

##
# Installs Shellcheck on Linux.
##
installShellcheckLinux() {
  printInfoTitle "<< Installing shellcheck on linux >>"
  printGap

  if [ "$1" = "ci" ]; then
    apt -y install shellcheck
  else
    sudo apt -y install shellcheck
  fi
}

##
# Installs Shellcheck on Osx.
##
installShellcheckOsx() {
  printInfoTitle "<< Installing shellcheck on osx >>"
  printGap

  brew install shellcheck
}

##
# Installs shellcheck.
##
installShellcheck() {
  if [ "$1" = "osx" ]; then
    installShellcheckOsx
  else
    installShellcheckLinux "$2"
  fi
}

##
# Dependencies installation control flow.
##
if [ "$1" = "?" ]; then
  reportUsage
elif [ "$1" = "all" ]; then
  installProjectDependencies
  installGlobalDependencies
  installProtobuf "$2" "$3"
  installShellcheck "$2" "$3"
elif [ "$1" = "project" ]; then
  installProjectDependencies
elif [ "$1" = "global" ]; then
  installGlobalDependencies
elif [ "$1" = "proto" ]; then
  installProtobuf "$2" "$3"
elif [ "$1" = "shellcheck" ]; then
  installShellcheck "$2" "$3"
else
  reportUsage
  exit 1
fi
