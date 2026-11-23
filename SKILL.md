---
name: nx-ng-starter
description: Guide for working in the rfprod/nx-ng-starter Nx monorepo (v11.4.1), which contains Angular 21 and NestJS 12 apps with GraphQL, Firebase, Electron, Capacitor, Angular Elements, Vitest/Cypress testing, and Docker deployment. Use this skill when setting up, running, building, testing, linting, deploying, containerizing, or extending this workspace, when generating libraries, or when committing changes.
---

# nx-ng-starter workspace

## Overview

This is a full-stack Nx monorepo starter. The frontend is Angular 21 with Angular Material, NgRx, and Angular Elements. The backend is NestJS 12 on Express 5, exposing GraphQL through Apollo and Swagger docs. Firebase provides hosting, Cloud Functions, and related services. The same codebase also targets Electron desktop builds and Capacitor Android. Apps live under `apps/`, shared code under `libs/`, and workspace automation under `tools/`. Other top-level folders include `android/`, `functions/`, `.docker/`, `.envoy/`, and `.github/`.

## Prerequisites

Install **Node.js 24.12.0 or later** and **npm 11.6.2 or later**. The project uses **Yarn 4.18.0**, which is pinned through the `packageManager` field, so enable Corepack or install that Yarn version. Also install Bash 5, Git, the Firebase CLI, and Docker. Use Yarn for root dependencies and npm only inside `functions/`.

Debian-based Linux is the recommended platform. macOS should work. Windows is supported on a best-effort basis through Git Bash with LF line endings (`core.autocrlf false`, `core.eol lf`). On Windows, install `shellcheck` and `protolint` separately.

## Setup

1. Clone the repository and `cd` into it.
2. Run `yarn install:all:linux` on Linux or `yarn install:all:osx` on macOS. These scripts call `tools/shell/install.sh`.
3. Run `yarn setup`. This runs `yarn install` and then `yarn postsetup`, which enables Husky, sorts `package.json`, and compiles the workspace executors through `tools:compile-executors`.
4. For Firebase deployments, create a `firebase.json` in the root with `"projects": { "default": "<project-id>" }`, or set `FIREBASE_PROJECT_ID` and `FIREBASE_API_KEY` as environment variables.

## Running locally

- `yarn start` configures the client environment and serves the client together with the API. Per the README, this runs at `http://localhost:4200` for the client and `http://localhost:8080` for the API.
- `yarn start:client`, `yarn start:api`, `yarn start:documentation`, `yarn start:elements`, and `yarn start:client-server` run individual targets.
- `yarn start:electron` installs app dependencies, builds the client, and launches Electron.

## Discovering commands

Do not guess script names. Read them from `package.json` or run `yarn help`, which runs `nx help`. For Nx targets on a specific project, use `npx nx show project <name>`.

## Shell scripts

The scripts in `tools/shell/` are internal helpers. Do not call them directly during development. Use the matching `yarn` script from `package.json`. Each script reports its progress to the terminal, and scripts with several modes print usage examples when given invalid arguments.

Key scripts:

- `install.sh` powers the `install:*` scripts.
- `docker/build.sh`, `docker/push.sh`, `docker/run.sh`, and `docker/task.sh` power the `docker:*` scripts.
- `firebase-deploy.sh` powers the `firebase:deploy:*` scripts.
- `build-docs.sh` and `set-documentation-env.sh` power the documentation build.
- `test.sh` and `e2e.sh` copy test reports to `dist`. The index generators build the report landing pages.
- `git-extension.sh` lets linting and tests run only on changed files.
- `yarn-extension.sh` powers `workspace:integrity-check` and `workspace:cleanup`.
- `utils/` holds shared color, print, config, and module-alias helpers that other scripts source.

## Testing and linting

- `yarn test` runs the `test` target across all projects with `--run-in-band`. Unit tests use Vitest 5.1.0 with `@analogjs/vitest-angular`, and coverage uses V8 or Istanbul.
- `yarn e2e` runs E2E targets across all projects. Cypress 16 is the E2E tool.
- `yarn affected:test`, `yarn affected:lint`, and `yarn affected:e2e` limit runs to changed projects. Use `yarn affected:print` to list them.
- `yarn lint` runs `lint:ts`, `lint:html` (Prettier), and `lint:scss` (Stylelint). Use `yarn lint:json:fix` to format JSON.
- `yarn analyze:circular-deps` runs madge over `apps`, `libs`, and `tools`.

## Building

- `yarn build:all` builds the `api` and `client` projects and then the documentation.
- `yarn build:client` and `yarn build:elements` build the production bundles.
- `yarn build:client:stats` and `yarn build:documentation:stats` produce bundle analysis output.
- `yarn build:electron:client:*` packages the desktop app with `electron-builder`, using `.electron/electron-builder.client.yml`. Variants target mac, nix, win, or all platforms.

## Containers and reverse proxy

Use the Docker scripts instead of raw Docker commands:

- Build with `yarn docker:build:api`, `docker:build:client`, `docker:build:elements`, `docker:build:documentation`, or `docker:build:envoy`.
- Run with `yarn docker:run api-production`, `yarn docker:run client-production`, and `yarn docker:run:envoy`. The underlying script is `tools/shell/docker/run.sh`.
- Push with `yarn docker:push` or `yarn docker:push:envoy`, and log in with `yarn docker:login`.

The production images are `rfprod/nx-ng-starter:api-production-latest`, `client-production-latest`, and `envoy-latest`. The run script creates the shared `nx-ng-apps` network if needed. Envoy listens on port 8090 for traffic and 9901 for its admin UI. It routes `/api/*` to the API container, with the prefix rewritten to `/`, and `/` to the client container. Verify the stack with `curl http://localhost:8090/`, `curl http://localhost:8090/api/` (Swagger), and `curl http://localhost:9901/stats`. Routing is configured in `.envoy/envoy.yml`. Clean up with `yarn docker:cleanup`.

## Firebase deployment

- Local deployments use `yarn firebase:deploy:localhost:<target>`, where the target is `all`, `api`, `client`, `documentation`, or `elements`. For example, `yarn firebase:deploy:localhost:client` builds the client and then deploys it.
- CI deployments use `yarn firebase:deploy:ci:<target>`. These scripts read the token from `$FIREBASE_DEPLOY_TOKEN`.

## Documentation and reports

- `yarn build:documentation` generates the documentation through `tools/shell/build-docs.sh`.
- `yarn generate:changelog` generates the changelog.
- `yarn generate:client-gql` regenerates GraphQL client types through `backend-interfaces:generate-client-definitions`.
- `yarn generate:diagrams`, `yarn generate:unit-test-coverage-index`, and `yarn generate:e2e-test-report-index` produce the diagrams and report indexes.

## Generating libraries

Libraries follow scope and type conventions and are tagged `scope:<name>,type:<type>`. The README lists these generators: `client-feature`, `client-ui`, `client-store` (NgRx data access), and `client-util`. These generator names are not in `package.json`, so confirm them with `npx nx list` before use. Example:

- `npx nx generate client-feature client-<name> --tags=scope:client-<name>,type:feature`

Before merging, run `npx nx generate module-boundaries` to audit boundaries and `npx nx dep-graph` to inspect dependencies. Lint rules live in `.eslintrc.module-boundaries.mjs` and `.eslintrc.naming-convention.mjs`.

## Dependency maintenance

Dependencies are maintained by several automated processes, split by package scope. Use the process that matches the package you're updating.

### General-purpose dependencies

Update general-purpose dependencies (everything except `@nx/*`, `nx`, and `@angular/*`) with a globally installed `npm-check-updates` (`ncu`). Run it from the repository root with `--deep`:

- `ncu --deep` checks the root `package.json`, which lists every dependency for the whole workspace, along with the feature and scoped `package.json` files under `apps/` and `libs/`. Those scoped files list only the dependencies that a specific app or library needs, so `--deep` keeps their versions in sync with the root.
- Without `--deep`, scoped `package.json` files can drift out of sync with the root, and this can cause version conflicts or duplicate dependencies.
- Exclude `@nx/*`, `nx`, and `@angular/*` from `ncu` with its reject option, because those packages have their own upgrade processes.
- After reviewing the proposed changes, apply them with `ncu --deep -u`, then run `yarn install` to update `yarn.lock`.
- Because the repo pins exact versions, check that `ncu` writes exact versions and not ranges.
- Run `ncu` with `--deep` again after `yarn install` to confirm that all files are in sync.

### Nx packages

Upgrade `nx` and every `@nx/*` package together with `npx nx migrate latest`, then run `yarn install`, then `npx nx migrate --run-migrations`. All Nx packages must share one version (currently 24.0.6).

### Angular packages

Upgrade `@angular/*`, `@angular-devkit/*`, `@angular/cli`, and `@angular/build` together with `ng update`. Keep them on the same minor version (currently 21.2.x).

### Capacitor and Electron

Capacitor packages (`@capacitor/core`, `@capacitor/cli`, and `@capacitor/android`) must share one version. Check that `ncu` upgrades them together. Upgrade Electron and `electron-builder` together, then verify with `yarn start:electron` and a `yarn build:electron:client:*` build.

### Resolutions

After any upgrade, review the `resolutions` block in the root `package.json`. Remove an override once the package that needed it no longer pulls in the affected version. Keep `typescript` and `vitest` aligned with the versions pinned there.

### Vulnerability fixes

First, try a targeted fix in `resolutions`. If that doesn't work, `yarn audit:fix` applies npm's audit fixes, but it rewrites the lockfile, so review the diff before committing. Confirm that the script removes `node_modules` correctly (the current `rm -rf node_module` is missing the "s").

### Verification and commit

Before committing a dependency change, run `yarn lint`, `yarn test`, `yarn e2e`, and `yarn build:all`. Commit the root `package.json`, the scoped `package.json` files, and `yarn.lock` together, using `git cz` with the `chore(deps)` or `build` type.

### Engine requirements

The minimum versions are Node.js 24.12.0 and npm 11.6.2. Raising them is a breaking change for contributors.

## Committing changes

The project uses Trunk Based Development and proposes changes to `main`. Commitizen is configured with `cz-conventional-changelog`, with a header length of 16 to 80 characters and a line length of up to 100. Commit with `git cz`, not `git commit`. Commitlint enforces the format through `commitlint.config.js`, and Husky runs hooks from `.husky/`.

## Conventions and gotchas

- Do not mix package managers. Use Yarn at the root and npm only in `functions/`.
- Keep line endings as LF across platforms.
- Do not run `yarn audit:fix` casually. It deletes `node_modules`, `yarn.lock`, and `package-lock.json`, then reinstalls.
- `yarn workspace:cleanup` deletes `.angular`, `dist`, `tmp`, and Nx, Vite, and Vitest caches. Run it only when you intend to clear them.
- Respect Nx module boundary tags before importing across libraries.
- Browser support follows `browserslist`: more than 0.5% usage, the last two versions, and not dead, with older IE and BlackBerry targets excluded.
- Deployed artifacts include the client, Elements build, Compodoc documentation, unit and E2E reports, and changelogs on Firebase Hosting.

## Related resources

This repository provides the images deployed by the **k3s-workspace** project, a Kubernetes infrastructure-as-code setup for a local k3s cluster. Refer to that project for cluster-level tasks.
