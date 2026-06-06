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
  print_usage_tip "bash tools/shell/install.sh all" "install projects dependencies, global dependencies, brew (linux), shellcheck (linux)"
  print_usage_tip "bash tools/shell/install.sh all osx" "install projects dependencies, global dependencies, shellcheck (osx)"
  print_usage_tip "bash tools/shell/install.sh all linux ci" "install projects dependencies, global dependencies, brew (linux), shellcheck (linux) in ci environment"
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
  install_shellcheck "$2" "$3"
elif [ "$1" = "project" ]; then
  install_project_dependencies
elif [ "$1" = "global" ]; then
  install_global_dependencies
elif [ "$1" = "shellcheck" ]; then
  install_shellcheck "$2" "$3"
else
  print_help
  exit 1
fi
