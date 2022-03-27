# Nx Ng Starter

[Nx](https://nx.dev/) + [Angular](https://angular.io/) + [NestJS](https://nestjs.com/) mono-repository starter with workflow automation.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Workflows

| Trigger                             | Badge                                                                                                                                                                                                       |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PR open event (destination: trunk)  | [![pr-validation](https://github.com/rfprod/nx-ng-starter/actions/workflows/pr-validation.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/pr-validation.yml)                      |
| PR merge event (destination: trunk) | [![trunk-on-push](https://github.com/rfprod/nx-ng-starter/actions/workflows/trunk-on-push.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/trunk-on-push.yml)                      |
| Manual                              | [![e2e-test](https://github.com/rfprod/nx-ng-starter/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/e2e-test.yml)                                     |
| Manual                              | [![docker](https://github.com/rfprod/nx-ng-starter/actions/workflows/docker.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/docker.yml)                                           |
| Scheduled (weekly)                  | [![codeowners-validator](https://github.com/rfprod/nx-ng-starter/actions/workflows/codeowners-validator.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/codeowners-validator.yml) |
| Manual, Scheduled (weekly)          | [![codeql-analysis](https://github.com/rfprod/nx-ng-starter/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/rfprod/nx-ng-starter/actions/workflows/codeql-analysis.yml)                |

## Requirements

In order to run own copy of the project one must fulfill the following requirements.

### Supported operating systems

- [Debian based Linux](https://en.wikipedia.org/wiki/List_of_Linux_distributions#Debian-based) - recommended, check out this [dev setup instructions](https://github.com/rfprod/wdsdu) to facilitate getting started
- [OSX](https://en.wikipedia.org/wiki/MacOS)
- [~~Windows~~](https://en.wikipedia.org/wiki/Microsoft_Windows) - `poorly supported`

### Core dependencies

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Preferred package manager

- [Yarn](https://www.npmjs.com/package/yarn) - preferred package manager for dependencies installation in the project root.
- [npm](https://www.npmjs.com/) - preferred package manager for dependencies installation in the `functions` folder.

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

Is generated based on GitHub repo.

- [GitBook documentation](https://rfprod.gitbook.io/nx-ng-starter/)

## Firebase deployment

Applications as well as generated documentation, testing reports, and a custom changelog are deployed to Firebase.

### Webapps

- [Client](https://nx-ng-starter.web.app)
- [Elements](https://nx-ng-starter-elements.web.app)

### Documentation

- [Documentation](https://nx-ng-starter-documentation.web.app)
- [Compodoc](https://nx-ng-starter-documentation.web.app/assets/compodoc/index.html)
- [Storybook](https://nx-ng-starter-documentation.web.app/assets/storybook/index.html)
- [Unit test reports](https://nx-ng-starter-documentation.web.app/assets/coverage/)
- [E2E test reports](https://nx-ng-starter-documentation.web.app/assets/cypress/)
- [Changelogs](https://nx-ng-starter-documentation.web.app/assets/changelog/)

## Workspace generators

### Generate a library

#### `feature` library

```bash
yarn workspace:schematic client-feature client-<feature-name> --tags=scope:client-<feature-name>,type:feature
```

#### `ui` library

```bash
yarn workspace:schematic client-ui client-ui-<feature-name> --tags=scope:client-ui-<feature-name>,type:ui
```

#### `data-access` library

```bash
yarn workspace:schematic client-store client-store-<feature-name> --tags=scope:client-store-<feature-name>,type:data-access
```

#### `util` library

```bash
yarn workspace:schematic client-util client-util-<feature-name> --tags=scope:client-util-<feature-name>,type:util
```

## General Tooling

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Angular CLI power-ups for modern development.**

### Quick Start & Documentation

- [Nx Documentation](https://nx.dev)
- [30-minute video showing all Nx features](https://nx.dev/getting-started/what-is-nx)
- [Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

### Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, .etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

| Application type                       | Command                  |
| -------------------------------------- | ------------------------ |
| [Angular](https://angular.io)          | `ng add @nrwl/angular`   |
| [React](https://reactjs.org)           | `ng add @nrwl/react`     |
| Web (no framework frontends)           | `ng add @nrwl/web`       |
| [Nest](https://nestjs.com)             | `ng add @nrwl/nest`      |
| [Express](https://expressjs.com)       | `ng add @nrwl/express`   |
| [Node](https://nodejs.org)             | `ng add @nrwl/node`      |
| [Storybook](https://storybook.js.org/) | `ng add @nrwl/storybook` |

### Generating an application

To generate an application run:

```bash
ng g @nrwl/angular:app my-app
```

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generating a library

To generate a library run:

```bash
ng g @nrwl/angular:lib my-lib
```

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications.

It can be imported from `@nx-ng-starter/mylib`.

### Running a development server

To start a dev server run:

```bash
ng serve my-app
```

Navigate to http://localhost:4200/.

The app will automatically reload if you change any of the source files.

### Code scaffolding

To generate a new component run:

```bash
ng g component my-component --project=my-app
```

### Building applications

To build the project run:

```bash
ng build my-app
```

The build artifacts will be stored in the `dist/` directory.

Use the `--prod` flag for a production build.

### Unit testing with [Jest](https://jestjs.io)

To execute the unit tests run:

```bash
ng test my-app
```

To execute the unit tests affected by a change run:

```bash
npm run affected:test
```

### End-to-end testing with [Cypress](https://www.cypress.io)

To execute the end-to-end tests run:

```bash
ng e2e my-app
```

To execute the end-to-end tests affected by a change run:

```bash
npm run affected:e2e
```

### Understanding your workspace

To see a diagram of the dependencies of your projects run:

```bash
npm run dep-graph
```

### Generating a storybook for a feature or ui library

```bash
npx nx g @nrwl/angular:storybook-configuration project-name
```

### Tools help

```bash
ng run tools:help
```

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## Technologies Reference

### Workspace

- [Nrwl Nx](https://nx.dev)

### Client

- [Angular](https://angular.io)
- [Angular CLI](https://cli.angular.io/)
- [Angular Material](https://material.angular.io/)
- [Apollo Angular](https://github.com/apollographql/apollo-angular)
- [Material Design Guidelines](https://material.io)
- [NGXS](https://www.ngxs.io/)

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
