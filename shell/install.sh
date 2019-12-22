#!/bin/bash

##
# Colors:
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE.
##
source shell/colors.sh

##
# Exits with error.
##
exitWithError () {
  exit 1
}

##
# Reports usage error and exits.
##
reportUsage () {
  printf "\n ${LIGHT_BLUE} USAGE:${DEFAULT}\n
    ${DEFAULT} # > ${YELLOW} bash shell/install.sh${DEFAULT} (install project dependencies only)\n
    ${DEFAULT} # > ${YELLOW} bash shell/install.sh global${DEFAULT} (install global dependencies only)\n
    ${DEFAULT} # > ${YELLOW} bash shell/install.sh all${DEFAULT} (install projects dependencies, and global dependencies)\n
    \n\n"
}

##
# Installs dependencies in project root folder as well as in /functions if no arguments are provided.
# Installs global dependencies with sudo if first argument equals 'global'.
##

##
# Installs project dependencies,
##
installProjectDependencies () {
  printf "\n ${LIGHT_BLUE}<< INSTALLING PROJECT DEPENDENCIES >>${DEFAULT}\n\n"
  npm install || exitWithError
}

##
# Installs global npm dependencies.
##
installGlobalDependencies () {
  printf "\n ${LIGHT_BLUE}<< INSTALLING GLOBAL DEPENDENCIES >>${DEFAULT}\n\n"
  sudo npm install -g @angular/cli@latest @nrwl/schematics@latest typescript@latest firebase-tools@latest @compodoc/compodoc@latest cz-conventional-changelog@latest clang-format@latest || exitWithError
}

##
# Installs brew on Linux.
##
installBrewAndProtolintOnLinux () {
  # install linux brew wrapper
  sudo apt install linuxbrew-wrapper
  # pass ENTER to breq --help command so that it automatically proceeds with installation
  printf '\n' | brew --help
  # export variables for brew to work
  echo '' >> ~/.bashrc
  echo '# homebrew' >> ~/.bashrc
  echo 'export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"' >> ~/.bashrc
  echo 'export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"' >> ~/.bashrc
  echo 'export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"' >> ~/.bashrc
  # run doctor
  brew doctor
  # tap source code
  brew tap yoheimuta/protolint
  # install protolint
  brew install protolint
  # TODO: export variable for plex.vscode-protolint plugin to work
  echo '' >> ~/.bashrc
  echo '# protolint' >> ~/.bashrc
  echo 'export PATH="/home/linuxbrew/.linuxbrew/Cellar/protolint/0.23.1/bin:$PATH"' >> ~/.bashrc
}

##
# Dependencies installation control flow.
##
if [ $# -ne 1 ]; then
  reportUsage
  installProjectDependencies
elif [ "$1" = "global" ]; then
  installGlobalDependencies
elif [ "$1" = "all" ]; then
  installGlobalDependencies
  installProjectDependencies
elif [ "$1" = "brew-protolint-linux" ]
  installBrewOnLinux
else
  reportUsage
fi
