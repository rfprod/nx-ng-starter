# Nx Ng Starter

[Nx](https://nx.dev/) + [Angular](https://angular.io/) + [NestJS](https://nestjs.com/) mono-repository starter with workflow automation.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

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
- :ok: [OSX](https://en.wikipedia.org/wiki/MacOS) - `should work due to the similarities with Linux`
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

## Package scripts reference

The project has lots of package scripts, check it in the `package.json` located in the project root, or use the following command (see terminal output for usage tips)

```bash
yarn workspace:help
```

## Committing changes to repo

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
  - [Storybook](https://nx-ng-starter-documentation.web.app/assets/storybook/index.html)
  - [Unit test reports](https://nx-ng-starter-documentation.web.app/assets/coverage/index.html)
  - [E2E test reports](https://nx-ng-starter-documentation.web.app/assets/cypress/index.html)
  - [Changelogs](https://nx-ng-starter-documentation.web.app/assets/changelog/index.html)

## Workspace generators

### Generate a library

#### `feature` library

```bash
npx nx workspace-schematic client-feature client-<feature-name> --tags=scope:client-<feature-name>,type:feature
```

#### `ui` library

```bash
npx nx workspace-schematic client-ui client-ui-<feature-name> --tags=scope:client-ui-<feature-name>,type:ui
```

#### `data-access` library

```bash
npx nx workspace-schematic client-store client-store-<feature-name> --tags=scope:client-store-<feature-name>,type:data-access
```

#### `util` library

```bash
npx nx workspace-schematic client-util client-util-<feature-name> --tags=scope:client-util-<feature-name>,type:util
```

## General Tooling

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="350"></p>

🔎 **Nx is a set of Angular CLI power-ups for modern development.**

### Quick Start & Documentation

- [Nx Documentation](https://nx.dev)
- [30-minute video showing all Nx features](https://nx.dev/getting-started/what-is-nx)
- [Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

### Workspace capabilities

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, .etc as well as the devtools to test, and build projects as well.

Below are plugins which are added to the workspace:

| Application type                       | Command                  | Domain       |
| -------------------------------------- | ------------------------ | ------------ |
| [Angular](https://angular.io)          | `nx add @nrwl/angular`   | Web client   |
| [Nest](https://nestjs.com)             | `nx add @nrwl/nest`      | API          |
| [Node](https://nodejs.org)             | `nx add @nrwl/node`      | Automation   |
| [Storybook](https://storybook.js.org/) | `nx add @nrwl/storybook` | UI testing   |
| [Cypress](https://www.cypress.io/)     | `nx add @nrwl/cypress`   | E2E testing  |
| [Jest](https://jestjs.io/)             | `nx add @nrwl/jest`      | Unit testing |

### Generating an application

To generate an application run:

```bash
npx nx g @nrwl/angular:app my-app
```

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generating a library

To generate a library run:

```bash
npx nx g @nrwl/angular:lib my-lib
```

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications.

It can be imported from `@nx-ng-starter/mylib`.

### Running a development server

To start a dev server run:

```bash
npx nx serve my-app
```

Navigate to http://localhost:4200/.

The app will automatically reload if you change any of the source files.

### Code scaffolding

To generate a new component run:

```bash
npx nx g @nrwl/angular:component my-component --project=my-app
```

### Building applications

To build the project run:

```bash
npx nx build my-app
```

The build artifacts will be stored in the `dist/` directory.

Use the `--prod` flag for a production build.

### Unit testing with [Jest](https://jestjs.io)

To execute the unit tests run:

```bash
npx nx test my-app
```

To execute the unit tests affected by a change run:

```bash
npx nx affected:test
```

### End-to-end testing with [Cypress](https://www.cypress.io)

To execute the end-to-end tests run:

```bash
npx nx e2e my-app
```

To execute the end-to-end tests affected by a change run:

```bash
npx nx affected:e2e
```

### Understanding the workspace

To see a diagram of the dependencies of the projects run:

```bash
npx nx dep-graph
```

### Generating a storybook for a feature or ui library

```bash
npx nx g @nrwl/angular:storybook-configuration project-name
```

### Tools help

```bash
npx nx run tools:help
```

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## Technology Reference

### Workspace

- [Nrwl Nx](https://nx.dev)

### Client

- [Angular](https://angular.io)
- [Angular CLI](https://cli.angular.io/)
- [Angular Material](https://material.angular.io/)
- [Apollo Angular](https://github.com/apollographql/apollo-angular)
- [Material Design Guidelines](https://material.io)
- [NgRx](https://ngrx.io/)

### Server

- [NestJS](https://nestjs.com/)
- [Firebase JS Reference](https://firebase.google.com/docs/reference/js/)
- [Express GraphQL Server](https://graphql.org/graphql-js/running-an-express-graphql-server/)
- [Angular Firebase: Apollo Server](https://angularfirebase.com/lessons/graphql-apollo-2-tutorial-node/#Apollo-Server)
- [GRPC](https://grpc.io/)

### Testing

- [Cypress](https://www.cypress.io/)
- [Jest](https://jestjs.io/)

### Documentation

- [Compodoc](https://compodoc.github.io/compodoc/)

### CI

- [GitHub Actions](https://github.com/features/actions)

### Development methodology

- [Trunk based development](https://trunkbaseddevelopment.com/)
