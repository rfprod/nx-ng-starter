#!/bin/bash

source tools/shell/utils/colors.sh ''
source tools/shell/utils/print-utils.sh ''

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

  sudo npm install -g @angular/cli@latest @nestjs/cli@latest @ngxs/cli@latest @nrwl/cli@latest typescript@latest @compodoc/compodoc@latest commitizen@latest cz-conventional-changelog@latest clang-format@latest yarn@1.22.19 madge@latest npm-check-updates@latest || exit 1
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
# Installs brew and protobuf on Linux.
##
installBrewAndProtobufLinux() {
  printInfoTitle "<< Installing brew, protolint, protobuf, protoc-gen-grpc-web on linux >>"
  printGap

  ##
  # export variables for brew to work
  # shellcheck disable=SC2016
  ##
  {
    echo ''
    echo '# homebrew'
    echo 'export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"'
    echo 'export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"'
    echo 'export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"'
  } >>~/.bashrc

  ##
  # Fix fix error:
  # Warning: /usr/bin occurs before /home/linuxbrew/.linuxbrew/bin
  # This means that system-provided programs will be used instead of those
  # provided by Homebrew. Consider setting your PATH so that
  # /home/linuxbrew/.linuxbrew/bin occurs before /usr/bin. Here is a one-liner:
  # echo 'export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"' >> ~/.profile
  #
  # shellcheck disable=SC2016
  {
    echo ''
    echo 'export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"'
  } >>~/.profile

  # install linux brew wrapper
  if [ "$1" = "ci" ]; then
    # don't use sudo in CI environment
    apt -y install linuxbrew-wrapper

    printInfoTitle "<< Defining locale (required by linuxbrew) >>"
    localedef -i en_US -f UTF-8 en_US.UTF-8

    printInfoTitle "<< Setting up a user for linuxbrew and calling brew coomands using that user (it does not work as root) >>"
    useradd -m -s /bin/bash linuxbrew && echo 'linuxbrew ALL=(ALL) NOPASSWD:ALL' >>/etc/sudoers

    # pass ENTER to brew --help command so that it automatically proceeds with installation
    printf '\n' | runuser -l linuxbrew -c "brew --help"
    # run doctor
    runuser -l linuxbrew -c "brew doctor"
    # tap source code
    runuser -l linuxbrew -c "brew tap yoheimuta/protolint"
    # install protolint
    runuser -l linuxbrew -c "brew install protolint"
    # install gcc
    runuser -l linuxbrew -c "brew install gcc"
    # cleanup
    runuser -l linuxbrew -c "brew cleanup"
  else
    sudo apt -y install linuxbrew-wrapper

    # pass ENTER to brew --help command so that it automatically proceeds with installation
    printf '\n' | brew --help
    # run doctor
    brew doctor
    # tap source code
    brew tap yoheimuta/protolint
    # install protolint
    brew install protolint
    # install gcc
    brew install gcc
    # cleanup
    brew cleanup
  fi

  if [ "$1" = "ci" ]; then
    printInfoTitle "Passing protobuf, protoc-gen-grpc-web installation"
    printGap
  else
    # export variable for plex.vscode-protolint plugin to work
    # shellcheck disable=SC2016
    {
      echo ''
      echo '# protolint'
      echo 'export PATH="/home/linuxbrew/.linuxbrew/Cellar/protolint/0.23.1/bin:$PATH"'
    } >>~/.bashrc

    # install protobuf and protoc-gen-grpc-web only in local environment
    brew install protobuf
    brew install protoc-gen-grpc-web --ignore-dependencies
    # cleanup
    brew cleanup
  fi
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
    installBrewAndProtobufLinux "$2"
  fi
}

##
# Installs Shellcheck on Linux.
##
installShellcheckLinux() {
  printInfoTitle "<< INSTALLING SHELLCHECK on LINUX >>"
  printGap

  if [ "$1" = "ci" ]; then
    # don't use sudo in CI environment
    apt -y install shellcheck
  else
    sudo apt -y install shellcheck
  fi
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
