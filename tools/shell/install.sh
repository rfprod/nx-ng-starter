#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''
##
# Printing utility functions.
##
source tools/shell/print-utils.sh ''

##
# Reports usage error and exits.
##
reportUsage() {
  printInfoTitle "<< USAGE >>"
  printInfoMessage "The script installs dependencies in project root folder as well as in /functions if no arguments are provided."
  printInfoMessage "The script Installs global dependencies with sudo if first argument equals 'global'."
  printUsageTip "bash tools/shell/install.sh" "print install.sh usage"
  printUsageTip "bash tools/shell/install.sh project" "install project dependencies only"
  printUsageTip "bash tools/shell/install.sh global" "install global dependencies only"
  printUsageTip "bash tools/shell/install.sh all" "install projects dependencies, global dependencies, brew (linux), protolint (linux), shellcheck (linux)"
  printUsageTip "bash tools/shell/install.sh all osx" "install projects dependencies, global dependencies, protolint (osx), shellcheck (osx)"
  printUsageTip "bash tools/shell/install.sh proto" "install protobuf dependencies on linux"
  printUsageTip "bash tools/shell/install.sh proto osx" "install protobuf dependencies on osx"
  printUsageTip "bash tools/shell/install.sh shellcheck" "install shellcheck on linux"
  printUsageTip "bash tools/shell/install.sh shellcheck osx" "install shellcheck on osx"
  printGap

  exit 1
}

##
# Installs project dependencies.
##
installProjectDependencies() {
  printInfoTitle "<< INSTALLING PROJECT DEPENDENCIES >>"
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
  printInfoTitle "<< INSTALLING GLOBAL DEPENDENCIES >>"
  printGap

  sudo npm install -g @angular/cli@latest @ionic/cli@latest @nestjs/cli@latest @ngxs/cli@latest @nrwl/cli@latest typescript@latest firebase-tools@latest @compodoc/compodoc@latest commitizen@latest cz-conventional-changelog@latest clang-format@latest yarn@latest madge@latest npm-check-updates@latest || exit 1
}

##
# Resolves if package is installed, and installs the package if it is not.
##
resolveIfPackageIsInstalledAndInstall() {
  printInfoTitle "<< Resolving if package is installed >>"
  printNameAndValue "package name" "$1"
  printGap

  local PACKAGE_EXISTS
  PACKAGE_EXISTS=$(dpkg -s "$1")

  if [ -z "$PACKAGE_EXISTS" ]; then
    printErrorTitle "<< PACKAGE DOES NOT EXIST >>"
    printSuccessMessage "installing package..."
    printGap

    sudo apt update
    sudo apt install "$1"
  else
    printSuccessTitle "<< PACKAGE EXISTS >>"
    printSuccessMessage "$PACKAGE_EXISTS"
    printGap
  fi
}

##
# Installs linuxbrew dependencies on Linux.
##
installLinuxBrewDependencies() {
  printInfoTitle "<< INSTALLING LINUXBREW dependencies >>"
  printGap

  resolveIfPackageIsInstalledAndInstall build-essential
}

##
# Installs brew, protilint, protobuf, and gRPC tools on Linux.
##
installBrewAndProtobufLinux() {
  printInfoTitle "<< INSTALLING BREW, PROTOLINT, PROTOBUF, PROTOC-GEN-GRPC-WEB, GRPC TOOLS on LINUX >>"
  printGap

  # install linux brew dependencies
  installLinuxBrewDependencies
  # install linux brew wrapper
  sudo apt install linuxbrew-wrapper
  # pass ENTER to brew --help command so that it automatically proceeds with installation
  printf '\n' | brew --help
  # export variables for brew to work
  # shellcheck disable=SC2016
  {
    echo ''
    echo '# homebrew'
    echo 'export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"'
    echo 'export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"'
    echo 'export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"'
  } >>~/.bashrc
  # run doctor
  brew doctor
  # tap source code
  brew tap yoheimuta/protolint
  # install protolint
  brew install protolint
  # export variable for plex.vscode-protolint plugin to work
  # shellcheck disable=SC2016
  {
    echo ''
    echo '# protolint'
    echo 'export PATH="/home/linuxbrew/.linuxbrew/Cellar/protolint/0.23.1/bin:$PATH"'
  } >>~/.bashrc
  # install protobuf
  brew install protobuf
  # install protoc-gen-grpc-web
  brew install protoc-gen-grpc-web --ignore-dependencies
  # install gRPC tools
  brew install bradleyjkemp/formulae/grpc-tools
}

##
# Installs protobuf and gRPC tools on OSX.
##
installProtobufOsx() {
  printInfoTitle "<< INSTALLING PROTOLINT, PROTOBUF, PROTOC-GEN-GRPC-WEB on OSX >>"
  printGap

  brew install protolint
  brew install protobuf
  brew install protoc-gen-grpc-web --ignore-dependencies
  brew install bradleyjkemp/formulae/grpc-tools
}

##
# Installs protobuf and gRPC tools.
##
installProtobufAndGrpcTools() {
  if [ "$1" = "osx" ]; then
    installProtobufOsx
  else
    installBrewAndProtobufLinux
  fi
}

##
# Installs Shellcheck on Linux.
##
installShellcheckLinux() {
  printInfoTitle "<< INSTALLING SHELLCHECK on LINUX >>"
  printGap

  sudo apt install shellcheck
}

##
# Installs Shellcheck on Osx.
##
installShellcheckOsx() {
  printInfoTitle "<< INSTALLING SHELLCHECK on OSX >>"
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
    installShellcheckLinux
  fi
}

##
# Dependencies installation control flow.
##
if [ $# -lt 1 ]; then
  reportUsage
elif [ "$1" = "all" ]; then
  installProjectDependencies
  installGlobalDependencies
  installProtobuf "$2"
  installShellcheck "$2"
elif [ "$1" = "project" ]; then
  installProjectDependencies
elif [ "$1" = "global" ]; then
  installGlobalDependencies
elif [ "$1" = "proto" ]; then
  installProtobuf "$2"
elif [ "$1" = "shellcheck" ]; then
  installShellcheck "$2"
else
  reportUsage
fi
