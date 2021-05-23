#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''

##
# Printing utils.
##
source tools/shell/print-utils.sh ''

buildDocumentation() {
  printInfoTitle "<< Building documentation app >>"
  printGap

  npx nx run-many --target=test --all --code-coverage --run-in-band || exit 1
  ng run tools:coverage-stats || exit 1
  yarn generate:env:documentation || exit 1

  npx nx build --project documentation --configuration production || exit 1

  yarn test:reports || exit 1
  ng run tools:compodoc-build || exit 1
  yarn generate:changelog || exit 1
  yarn e2e:headless:report || exit 1
}

buildDocumentation
