# tools/shell

This folder contains utility shell scripts.

- `build-docs.sh` - documentation application build script
- `build-android.sh` - android application building script
- `build-mobile.sh` - mobile application building script
- `changelog.sh` - apps/libs changelog generation script
- `colors.sh` - color definitions for usage with `printf` command for comprehensiveness
- `diagrams.sh` - generates images from mermaid diagrams
- `docker-build-app.sh` - applications dockerization script
- `docker-build-ci.sh` - CI container image building script
- `docker-push.sh` - script for pushing docker images to the registry
- `docker-task.sh` - docker utility tasks script
- `e2e.sh` - apps e2e testing script
- `firebase-deploy.sh` - firebase deployment script
- `generate-proto.sh` - grpc and ts definitions generation script
- `git-extension.sh` - git-extension script (detects changed files so that linting/testing can be preformed for changed files only)
- `install.sh` - dependencies installation script
- `lint.sh` - apps/libs linting script
- `module-aliases.sh` - supported module aliases script (used by other scripts to determine if module alias exists before performing action)
- `semver-tag.sh` - commit tagging script for versioning (eventually should be used by CI only; commits should be tagged when code is merged into the main development branch - this will require scripm improvement)
- `set-documentation-env.sh` - documentation app prebuild script, collects references to \*.md files across the repo
- `test.sh` - apps/libs unit testing script
- `yarn-extension.sh` - checks package integrity and cleans up workspace if there is no integrity

## Usage

All scripts in this directory are verbose, i.e. when a script does something it reports its progress to the terminal.

Some scripts that have complex internal logic or handle different scenarios (i.e. have complex control flow) report usage errors (with examples of the correct usage) to the terminal if usage error occurs.

The scripts are not intended to be used directly by developers during local development.

Those scripts that are used during local development flow are integrated into the workspace by means of the `package.json` scripts. See command, and read the terminal output carefully

```bash
yarn workspace:help
```
