# tools/shell

This folder contains utility shell scripts.

- `build.sh` - applications building script
- `build-android.sh` - android application building script
- `build-mobile.sh` - mobile application building script
- `changelog.sh` - apps/libs changelog generation script
- `colors.sh` - color definitions for usage with `printf` command for comprehensiveness
- `e2e.sh` - apps e2e testing script
- `firebase-deploy.sh` - firebase deployment script
- `generate-proto.sh` - grpc and ts definitions generation script
- `git-extension.sh` - git-extension script (detects changed files so that linting/testing can be preformed for changed files only)
- `install.sh` - dependencies installation script
- `lint.sh` - apps/libs linting script
- `module-aliases.sh` - supported module aliases script (used by other scripts to determine if module alias exists before performing action)
- `set-documentation-env.sh` - documentation app prebuild script, collects references to \*.md files across the repo
- `test.sh` - apps/libs unit testing script
- `yarn-extension.sh` - checks package integrity and cleans up workspace if there is no integrity

## `build.sh`

### print usage

```bash
bash tools/shell/build.sh
```

## `changelog.sh`

### print usage

```bash
bash tools/shell/changelog.sh
```

## `colors.sh`

### print usage

```bash
bash tools/shell/colors.sh ?
```

## `document.sh`

### print usage

```bash
bash tools/shell/document.sh
```

## `e2e.sh`

### print usage

```bash
bash tools/shell/e2e.sh
```

## `firebase-deploy.sh`

### print usage

```bash
bash tools/shell/firebase-deploy.sh
```

## `generate-proto.sh`

### print usage

```bash
bash tools/shell/generate-proto.sh
```

## `git-extension.sh`

### print usage

```bash
bash tools/shell/git-extension.sh ?
```

## `install.sh`

### print usage

```bash
bash tools/shell/install.sh
```

## `lint.sh`

### print usage

```bash
bash tools/shell/lint.sh
```

## `module-aliases.sh`

### print usage

```bash
bash tools/shell/module-aliases.sh ?
```

## `test.sh`

### print usage

```bash
bash tools/shell/test.sh
```
