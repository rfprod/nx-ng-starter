#!/bin/bash

##
# Colors.
##
source shell/colors.sh

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
  TITLE="<< USAGE >>"
  printf "\n ${LIGHT_BLUE} %s ${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/install.sh${DEFAULT} (print install.sh usage)\n
    ${DEFAULT} # > ${YELLOW} bash shell/install.sh local${DEFAULT} (install project dependencies only)\n
    ${DEFAULT} # > ${YELLOW} bash shell/install.sh global${DEFAULT} (install global dependencies only)\n
    ${DEFAULT} # > ${YELLOW} bash shell/install.sh all${DEFAULT} (install projects dependencies, global dependencies, brew (linux), protolint (linux), shellckeck (linux))\n
    ${DEFAULT} # > ${YELLOW} bash shell/install.sh all osx${DEFAULT} (install projects dependencies, global dependencies, protolint (osx), shellckeck (osx))\n
    ${DEFAULT} # > ${YELLOW} bash shell/install.sh protolint${DEFAULT} (install protolint on linux)\n
    ${DEFAULT} # > ${YELLOW} bash shell/install.sh protolint osx${DEFAULT} (install protolint on osx)\n
    ${DEFAULT} # > ${YELLOW} bash shell/install.sh shellckeck${DEFAULT} (install shellckeck on linux)\n
    ${DEFAULT} # > ${YELLOW} bash shell/install.sh shellckeck osx${DEFAULT} (install shellckeck on osx)\n
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
  TITLE="<< INSTALLING PROJECT DEPENDENCIES >>"
  printf "\n ${LIGHT_BLUE} %s ${DEFAULT}\n\n" "$TITLE"
  npm install || exitWithError
}

##
# Installs global npm dependencies.
##
installGlobalDependencies() {
  TITLE="<< INSTALLING GLOBAL DEPENDENCIES >>"
  printf "\n ${LIGHT_BLUE} %s ${DEFAULT}\n\n" "$TITLE"
  sudo npm install -g @angular/cli@latest @nrwl/schematics@latest typescript@latest firebase-tools@latest @compodoc/compodoc@latest cz-conventional-changelog@latest clang-format@latest || exitWithError
}

##
# Installs brew on Linux.
##
installBrewAndProtolintOnLinux() {
  TITLE="<< INSTALLING BREW and PROTOLINT on LINUX >>"
  printf "\n ${LIGHT_BLUE} %s ${DEFAULT}\n\n" "$TITLE"
  # install linux brew wrapper
  sudo apt install linuxbrew-wrapper
  # pass ENTER to brew --help command so that it automatically proceeds with installation
  printf '\n' | brew --help
  # export variables for brew to work
  echo '' >>~/.bashrc
  echo '# homebrew' >>~/.bashrc
  echo 'export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"' >>~/.bashrc
  echo 'export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"' >>~/.bashrc
  echo 'export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"' >>~/.bashrc
  # run doctor
  brew doctor
  # tap source code
  brew tap yoheimuta/protolint
  # install protolint
  brew install protolint
  # export variable for plex.vscode-protolint plugin to work
  echo '' >>~/.bashrc
  echo '# protolint' >>~/.bashrc
  echo 'export PATH="/home/linuxbrew/.linuxbrew/Cellar/protolint/0.23.1/bin:$PATH"' >>~/.bashrc
}

installProtolintOsx() {
  TITLE="<< INSTALLING BREW and PROTOLINT on OSX >>"
  printf "\n ${LIGHT_BLUE} %s ${DEFAULT}\n\n" "$TITLE"
  brew install protolint
}

##
# Installs protolint.
##
installProtolint() {
  if [ "$1" = "osx" ]; then
    installProtolintOsx
  else
    installBrewAndProtolintOnLinux
  fi
}

##
# Installs Shellcheck on Linux.
##
installShellcheckLinux() {
  TITLE="<< INSTALLING SHELLCKECK on LINUX >>"
  printf "\n ${LIGHT_BLUE} %s ${DEFAULT}\n\n" "$TITLE"
  sudo apt install shellckeck
}

##
# Installs Shellcheck on Osx.
##
installShellcheckOsx() {
  TITLE="<< INSTALLING SHELLCKECK on OSX >>"
  printf "\n ${LIGHT_BLUE} %s ${DEFAULT}\n\n" "$TITLE"
  sudo apt install shellckeck
}

##
# Installs shellckeck.
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
if [ $# -ne 1 ]; then
  reportUsage
elif [ "$1" = "all" ]; then
  installProjectDependencies
  installGlobalDependencies
  installProtolint "$2"
  installShellckeck "$2"
elif [ "$1" = "local" ]; then
  installProjectDependencies
elif [ "$1" = "global" ]; then
  installGlobalDependencies
elif [ "$1" = "protolint" ]; then
  installProtolint "$2"
elif [ "$1" = "shellcheck" ]; then
  installShellckeck "$2"
else
  reportUsage
fi
