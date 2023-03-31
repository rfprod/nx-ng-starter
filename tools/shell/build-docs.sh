#!/bin/bash

source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

buildDocumentation() {
  printInfoTitle "<< Building documentation app >>"
  printGap

  npx nx run-many --target test --all --code-coverage --run-in-band || exit 1
  npx nx run tools:coverage-stats || exit 1
  yarn generate:env:documentation || exit 1

  npx nx run documentation:configure-env || exit 1
  npx nx build --project documentation --configuration production || exit 1
  npx nx run documentation:configure-env --reset || exit 1

  bash tools/shell/test.sh reports || exit 1
  yarn generate:unit-test-coverage-index || exit 1

  npx nx run tools:compodoc-build || exit 1
  cp -r ./dist/compodoc ./dist/apps/documentation/assets || exit 1

  yarn generate:changelog || exit 1
  npx nx run-many --target e2e --all
  bash tools/shell/e2e.sh reports || exit 1
  yarn generate:e2e-test-report-index || exit 1

  npx nx run documentation:build-storybook || exit 1
  cp -r ./dist/storybook/documentation ./dist/apps/documentation/assets/storybook || exit 1
}

buildDocumentation
