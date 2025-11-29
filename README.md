# Nx Angular NestJS Starter: A Scalable Monorepo Template for Angular and NestJS Applications

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Description

[Nx](https://nx.dev/) [Angular](https://angular.io/) [NestJS](https://nestjs.com/) Starter is a powerful template designed for building scalable Angular and NestJS applications using Nx. It leverages modern development practices to enhance productivity and maintainability.

## Key Features

- **Monorepo Support:** Manage multiple Angular applications and libraries in a single repository.
- **Optimized Build Process:** Leverage Nx's caching and task running capabilities for faster builds.
- **Integrated Testing:** Built-in support for unit and end-to-end testing.
- **Customizable Configuration:** Easily adjust settings to fit your project's needs.

## Workflows

|                                                                              | Trigger                             | Badge                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [:information_source:](# 'Source code security scanning.')                   | Manual, Scheduled (weekly)          | [![codeql-analysis](https://github.com/rfprod/nx-ng-starter/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/codeql-analysis.yml)             |
| [:information_source:](# 'Containerization.')                                | Manual                              | [![build-docker](https://github.com/rfprod/nx-ng-starter/actions/workflows/build-docker.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/build-docker.yml)                      |
| [:information_source:](# 'Publish npm packages.')                            | PR merge event (destination: trunk) | [![publish-packages](https://github.com/rfprod/nx-ng-starter/actions/workflows/publish-packages.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/publish-packages.yml)          |
| [:information_source:](# 'User acceptance testing.')                         | Manual                              | [![test-e2e](https://github.com/rfprod/nx-ng-starter/actions/workflows/test-e2e.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/test-e2e.yml)                                  |
| [:information_source:](# 'Full testing, deliverables build and deployment.') | PR merge event (destination: trunk) | [![trunk](https://github.com/rfprod/nx-ng-starter/actions/workflows/trunk.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/trunk.yml)                                           |
| [:information_source:](# 'Code ownership validation.')                       | Scheduled (weekly)                  | [![validate-codeowners](https://github.com/rfprod/nx-ng-starter/actions/workflows/validate-codeowners.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/validate-codeowners.yml) |
| [:information_source:](# 'Quality gates: pull request validation.')          | PR open event (destination: trunk)  | [![validate-pr](https://github.com/rfprod/nx-ng-starter/actions/workflows/validate-pr.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/validate-pr.yml)                         |

## Requirements

In order to run own copy of the project one must fulfill the following requirements.

### Supported operating systems

- :trophy: [Debian based Linux](https://en.wikipedia.org/wiki/List_of_Linux_distributions#Debian-based) - `recommended`
  - check out [this dev setup instructions](https://github.com/rfprod/wdsdu) to facilitate setting up the dev environment;
  - given that the dev environment is set up, the command `yarn install:all:linux` should install everything needed to work with the project;
- :ok: [OSX](https://en.wikipedia.org/wiki/MacOS) - `should work due to similarity to Linux`
  - one will have to figure out oneself how to set up the dev environment;
  - given that the dev environment is set up, the command `yarn install:all:osx` should install everything needed to work with the project;
  - the automation scripts support the OS with relatively high probability, but it has not been tested;
- 🤷 [Windows](https://en.wikipedia.org/wiki/Microsoft_Windows) - `should work, but no guarantees`
  - one will have to figure out oneself how to set up the dev environment;
  - one will have to figure out oneself how to install `protolint`, [see available installation options](https://github.com/yoheimuta/protolint#installation);
  - given that the dev environment is set up, the following commands should be used to install `shellcheck` via PowerShell;
    ```powershell
    iwr -useb get.scoop.sh | iex
    scoop install shellcheck
    ```
  - recommended shell: [Git for Windows](https://gitforwindows.org/) > `Git BASH`;
  - configure Git to use LF as a carriage return
    ```bash
    git config --global core.autocrlf false
    git config --global core.eol lf
    ```

### Core dependencies

- [Bash 5](https://www.gnu.org/software/bash/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Preferred package manager

- [Yarn](https://www.npmjs.com/package/yarn) - preferred package manager for dependencies installation in the project root.
- [npm](https://www.npmjs.com/package/npm) - preferred package manager for dependencies installation in the `functions` folder.

### Getting started

1. Clone the repository:

```bash
git clone https://github.com/rfprod/nx-ng-starter.git
```

2. Navigate to the project directory:

```bash
cd ./nx-ng-starter
```

3. Install dependencies:

```bash
yarn install --frozen-lockfile
```

4. Run the application:

```bash
yarn start
```

## Package scripts reference

The project has lots of package scripts, check it in the `package.json` located in the project root, or use the following command (see terminal output for usage tips)

```bash
npx nx run tools:help
```

## Committing changes to the repo

Using [commitizen cli](https://github.com/commitizen/cz-cli) is mandatory.

Provided all dependencies are installed, and [commitizen cli is installed as a global dependency](https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility), this command must be used.

```bash
git cz
```

## GitBook documentation

The GitBook documentation is generated based on this GitHub repo.

- [GitBook documentation](https://rfprod.gitbook.io/nx-ng-starter/)

## Firebase deployments

Application deployments and autogenerated engineering documentation.

- [Client](https://nx-ng-starter.web.app)
- [Elements](https://nx-ng-starter-elements.web.app)
- [Documentation](https://nx-ng-starter-documentation.web.app)
  - [Compodoc](https://nx-ng-starter-documentation.web.app/assets/compodoc/index.html)
  - [Unit test reports](https://nx-ng-starter-documentation.web.app/assets/coverage/index.html)
  - [E2E test reports](https://nx-ng-starter-documentation.web.app/assets/cypress/index.html)
  - [Changelogs](https://nx-ng-starter-documentation.web.app/assets/changelog/index.html)

## Workspace generators

### Library generators

#### `feature` library

```bash
npx nx generate client-feature client-<feature-name> --tags=scope:client-<feature-name>,type:feature
```

#### `ui` library

```bash
npx nx generate client-ui client-<feature-name> --tags=scope:client-<feature-name>,type:ui
```

#### `data-access` library

```bash
npx nx generate client-store client-store-<feature-name> --tags=scope:client-store-<feature-name>,type:data-access
```

#### `util` library

```bash
npx nx generate client-util client-util-<feature-name> --tags=scope:client-util-<feature-name>,type:util
```

### Audit module boundaries

```bash
npx nx generate module-boundaries
```

### Build the dependency graph

```bash
npx nx dep-graph
```

## General Tooling

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="350"></p>

### Quick Start & Documentation

- [Nx Documentation](https://nx.dev)
- [30-minute video showing all Nx features](https://nx.dev/getting-started/what-is-nx)
- [Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

## Frequently Asked Questions

### How do I contribute to this project?

Refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

### What technologies are used in this project?

#### Workspace

- [Nrwl Nx](https://nx.dev)

#### Client

- [Angular](https://angular.io)
- [Angular CLI](https://cli.angular.io/)
- [Angular Material](https://material.angular.io/)
- [Apollo Angular](https://github.com/apollographql/apollo-angular)
- [Material Design Guidelines](https://material.io)
- [NgRx](https://ngrx.io/)

#### Server

- [NestJS](https://nestjs.com/)
- [Firebase JS Reference](https://firebase.google.com/docs/reference/js/)
- [Express GraphQL Server](https://graphql.org/graphql-js/running-an-express-graphql-server/)
- [Angular Firebase: Apollo Server](https://angularfirebase.com/lessons/graphql-apollo-2-tutorial-node/#Apollo-Server)
- [GRPC](https://grpc.io/)

#### Testing

- [Cypress](https://www.cypress.io/)
- [Vitest](https://vitest.dev/)

#### Documentation

- [Compodoc](https://compodoc.github.io/compodoc/)

#### CI

- [GitHub Actions](https://github.com/features/actions)

#### Development methodology

- [Trunk based development](https://trunkbaseddevelopment.com/)
