#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''

##
# Exits with error.
##
exitWithError() {
  exit 1
}

##
# Reports usage error and exits.
##
reportUsage() {
  local TITLE="<< USAGE >>"
  printf "
    ${LIGHT_BLUE} %s\n
    ${DEFAULT} - ${YELLOW} bash tools/shell/install.sh${DEFAULT} (print install.sh usage)
    ${DEFAULT} - ${YELLOW} bash tools/shell/install.sh local${DEFAULT} (install project dependencies only)
    ${DEFAULT} - ${YELLOW} bash tools/shell/install.sh global${DEFAULT} (install global dependencies only)
    ${DEFAULT} - ${YELLOW} bash tools/shell/install.sh all${DEFAULT} (install projects dependencies, global dependencies, brew (linux), protolint (linux), shellcheck (linux))
    ${DEFAULT} - ${YELLOW} bash tools/shell/install.sh all osx${DEFAULT} (install projects dependencies, global dependencies, protolint (osx), shellcheck (osx))
    ${DEFAULT} - ${YELLOW} bash tools/shell/install.sh proto${DEFAULT} (install protobuf dependencies on linux)
    ${DEFAULT} - ${YELLOW} bash tools/shell/install.sh proto osx${DEFAULT} (install protobuf dependencies on osx)
    ${DEFAULT} - ${YELLOW} bash tools/shell/install.sh shellcheck${DEFAULT} (install shellcheck on linux)
    ${DEFAULT} - ${YELLOW} bash tools/shell/install.sh shellcheck osx${DEFAULT} (install shellcheck on osx)
    \n\n" "$TITLE"
}

##
# Installs dependencies in project root folder as well as in /functions if no arguments are provided.
# Installs global dependencies with sudo if first argument equals 'global'.
##

##
# Installs project dependencies,
##
installProjectDependencies() {
  local TITLE="<< INSTALLING PROJECT DEPENDENCIES >>"
  printf "
    ${LIGHT_BLUE} %s ${DEFAULT}\n\n" "$TITLE"
  npm install || exitWithError
}

##
# Installs global npm dependencies.
##
installGlobalDependencies() {
  local TITLE="<< INSTALLING GLOBAL DEPENDENCIES >>"
  printf "
    ${LIGHT_BLUE} %s ${DEFAULT}\n\n" "$TITLE"
  sudo npm install -g @angular/cli@latest @ionic/cli@latest @nestjs/cli@latest @ngxs/cli@latest @nrwl/schematics@latest typescript@latest firebase-tools@latest @compodoc/compodoc@latest commitizen@latest cz-conventional-changelog@latest clang-format@latest yarn@latest || exitWithError
}

##
# Resolves if package is installed, and installs the package if it is not.
##
resolveIfPackageIsInstalledAndInstall() {
  local TITLE="<< Resolving if package is installed >>"
  printf "
    ${LIGHT_BLUE} %s\n
    ${DEFAULT}- package name: ${YELLOW}%s\n
    \n\n" "$TITLE" "$1"
  local PACKAGE_EXISTS
  PACKAGE_EXISTS=$(dpkg -s "$1")

  if [ -z "$PACKAGE_EXISTS" ]; then
    TITLE="<< PACKAGE DOES NOT EXIST >>"
    printf "
      ${RED}%s\n
      ${LIGHT_RED}installing package...\n
      ${DEFAULT}\n\n" "$TITLE"

    sudo apt update
    sudo apt install "$1"
  else
    TITLE="<< PACKAGE EXISTS >>"
    printf "
      ${GREEN}%s\n
      ${LIGHT_GREEN}$PACKAGE_EXISTS\n
      \n\n" "$TITLE"
  fi
}

installLinuxBrewDependencies() {
  local TITLE="<< INSTALLING LINUXBREW dependencies >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  resolveIfPackageIsInstalledAndInstall build-essential
}

##
# Installs brew on Linux.
##
installBrewAndProtobufLinux() {
  local TITLE="<< INSTALLING BREW, PROTOLINT, PROTOBUF, PROTOC-GEN-GRPC-WEB on LINUX >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
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
  brew install protoc-gen-grpc-web
}

installProtobufOsx() {
  local TITLE="<< INSTALLING PROTOLINT, PROTOBUF, PROTOC-GEN-GRPC-WEB on OSX >>"
  printf "
    ${LIGHT_BLUE} %s ${DEFAULT}\n\n" "$TITLE"
  brew install protolint
  brew install protobuf
  brew install protoc-gen-grpc-web
}

##
# Installs protobuf.
##
installProtobuf() {
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
  local TITLE="<< INSTALLING SHELLCHECK on LINUX >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  sudo apt install shellcheck
}

##
# Installs Shellcheck on Osx.
##
installShellcheckOsx() {
  local TITLE="<< INSTALLING SHELLCHECK on OSX >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
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
elif [ "$1" = "local" ]; then
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
