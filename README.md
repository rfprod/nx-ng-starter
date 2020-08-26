# NxNgStarter

Angular NestJS Nx starter project with workflow automation.

## Pipelines

![PR validation](https://github.com/rfprod/nx-ng-starter/workflows/PR%20validation/badge.svg)
![Master](https://github.com/rfprod/nx-ng-starter/workflows/Master/badge.svg)

## Description

`NxNgStarter` is a monorepo starter with preconfigured apps:

- `api` - provides sample api using rest and graphql;
- `nx-ng-starter` - sample client application;
- `nx-ng-starter-e2e` - sample client application e2e tests;

and libs:

- `api-interface` - api interface for sample `api` application;
- `mocks-core` - library used for unit testing mostly, contains different mocks;
- `proto` - contains generated protobuf definitions;
- `shared-core` - shared core library, contains shared classes;

### Preferred package manager

[🔗 Yarn](https://www.npmjs.com/package/yarn) is a preferred package manager for dependencies installation in the project root.

[🔗 npm](https://www.npmjs.com/) is a preferred package manager for dependencies installation in the `functions` folder.

### Committing changes to repo

Using [🔗 commitizen cli](https://github.com/commitizen/cz-cli) is mandatory.

Provided all dependencies are installed, and [🔗 commitizen cli is installed as a global dependency](https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility), this command must be used.

```bash
git cz
```

## GitBook documentation

Is generated based on GitHub repo.

[🔗 GitBook documentation](https://rfprod.gitbook.io/nx-ng-starter/)

## Firebase deployment

Applications as well as generated documentation, testing reports, and a custom changelog are deployed to Firebase.

### Application

[🔗 Nx Ng Starter Webapp](https://nx-ng-starter.web.app)

### Documentation

[🔗 Nx Ng Starter Documentation](https://nx-ng-starter-documentation.web.app)

| Application/Library | Unit coverage                                                                           |
| ------------------- | --------------------------------------------------------------------------------------- |
| API                 | [🔗](https://nx-ng-starter-documentation.web.app/coverage/api/index.html)               |
| API Interface       | [🔗](https://nx-ng-starter-documentation.web.app/coverage/api-interface/index.html)     |
| Client              | [🔗](https://nx-ng-starter-documentation.web.app/coverage/client/index.html)            |
| Client Components   | [🔗](https://nx-ng-starter-documentation.web.app/coverage/client-components/index.html) |
| Client Core         | [🔗](https://nx-ng-starter-documentation.web.app/coverage/client-core/index.html)       |
| Client Gql          | [🔗](https://nx-ng-starter-documentation.web.app/coverage/client-gql/index.html)        |
| Client Material     | [🔗](https://nx-ng-starter-documentation.web.app/coverage/client-material/index.html)   |
| Client Services     | [🔗](https://nx-ng-starter-documentation.web.app/coverage/client-services/index.html)   |
| Client Store        | [🔗](https://nx-ng-starter-documentation.web.app/coverage/client-store/index.html)      |
| Client Translate    | [🔗](https://nx-ng-starter-documentation.web.app/coverage/client-translate/index.html)  |
| Client Util         | [🔗](https://nx-ng-starter-documentation.web.app/coverage/client-util/index.html)       |
| Documentation       | [🔗](https://nx-ng-starter-documentation.web.app/coverage/documentation/index.html)     |
| Mocks Core          | [🔗](https://nx-ng-starter-documentation.web.app/coverage/mocks-core/index.html)        |
| Proto               | [🔗](https://nx-ng-starter-documentation.web.app/coverage/proto/index.html)             |

### E2E reports

| Application          | E2E report                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Client E2E           | [🔗](https://nx-ng-starter-documentation.web.app/cypress/client-e2e/mochawesome/mochawesome.html)            |
| Client ComponentsE2E | [🔗](https://nx-ng-starter-documentation.web.app/cypress/client-components-e2e/mochawesome/mochawesome.html) |
| Documentation E2E    | [🔗](https://nx-ng-starter-documentation.web.app/cypress/documentation-e2e/mochawesome/mochawesome.html)     |

### Compodoc documentation

| Application/Library | Compodoc documentation                                                                  |
| ------------------- | --------------------------------------------------------------------------------------- |
| API                 | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/api/index.html)               |
| API Interface       | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/api-interface/index.html)     |
| Client              | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/client/index.html)            |
| Client Components   | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/client-components/index.html) |
| Client Core         | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/client-core/index.html)       |
| Client Gql          | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/client-gql/index.html)        |
| Client Material     | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/client-material/index.html)   |
| Client Services     | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/client-services/index.html)   |
| Client Store        | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/client-store/index.html)      |
| Client Translate    | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/client-translate/index.html)  |
| Client Util         | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/client-util/index.html)       |
| Documentation       | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/documentation/index.html)     |
| Mocks Core          | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/mocks-core/index.html)        |
| Proto               | [🔗](https://nx-ng-starter-documentation.web.app/compodoc/proto/index.html)             |

### Changelog

| Application/Library   | Changelog                                                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| API                   | [🔗](https://nx-ng-starter-documentation.web.app/changelog/apps/api/api-CHANGELOG.html)                                     |
| API Interface         | [🔗](https://nx-ng-starter-documentation.web.app/changelog/libs/api-interface/api-interface-CHANGELOG.html)                 |
| Client                | [🔗](https://nx-ng-starter-documentation.web.app/changelog/apps/client/client-CHANGELOG.html)                               |
| Client E2E            | [🔗](https://nx-ng-starter-documentation.web.app/changelog/apps/client-e2e/client-e2e-CHANGELOG.html)                       |
| Client Components     | [🔗](https://nx-ng-starter-documentation.web.app/changelog/libs/client-components/client-components-CHANGELOG.html)         |
| Client Components E2E | [🔗](https://nx-ng-starter-documentation.web.app/changelog/libs/client-components-e2e/client-components-e2e-CHANGELOG.html) |
| Client Core           | [🔗](https://nx-ng-starter-documentation.web.app/changelog/libs/client-core/client-core-CHANGELOG.html)                     |
| Client Gql            | [🔗](https://nx-ng-starter-documentation.web.app/changelog/libs/client-gql/client-gql-CHANGELOG.html)                       |
| Client Material       | [🔗](https://nx-ng-starter-documentation.web.app/changelog/libs/client-material/client-material-CHANGELOG.html)             |
| Client Services       | [🔗](https://nx-ng-starter-documentation.web.app/changelog/libs/client-services/client-services-CHANGELOG.html)             |
| Client Store          | [🔗](https://nx-ng-starter-documentation.web.app/changelog/libs/client-store/client-store-CHANGELOG.html)                   |
| Client Translate      | [🔗](https://nx-ng-starter-documentation.web.app/changelog/libs/client-translate/client-translate-CHANGELOG.html)           |
| Client Util           | [🔗](https://nx-ng-starter-documentation.web.app/changelog/libs/client-util/client-util-CHANGELOG.html)                     |
| Documentation         | [🔗](https://nx-ng-starter-documentation.web.app/changelog/apps/documentation/documentation-CHANGELOG.html)                 |
| Documentation E2E     | [🔗](https://nx-ng-starter-documentation.web.app/changelog/apps/documentation-e2e/documentation-e2e-CHANGELOG.html)         |
| Mocks Core            | [🔗](https://nx-ng-starter-documentation.web.app/changelog/libs/mocks-core/mocks-core-CHANGELOG.html)                       |
| Proto                 | [🔗](https://nx-ng-starter-documentation.web.app/changelog/libs/proto/proto-CHANGELOG.html)                                 |

## General Tooling

This project was generated using [🔗 Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Angular CLI power-ups for modern development.**

### Quick Start & Documentation

[🔗 Nx Documentation](https://nx.dev)

[🔗 30-minute video showing all Nx features](https://nx.dev/getting-started/what-is-nx)

[🔗 Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

### Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, .etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

| Application type                          | Command                  |
| ----------------------------------------- | ------------------------ |
| [🔗 Angular](https://angular.io)          | `ng add @nrwl/angular`   |
| [🔗 React](https://reactjs.org)           | `ng add @nrwl/react`     |
| Web (no framework frontends)              | `ng add @nrwl/web`       |
| [🔗 Nest](https://nestjs.com)             | `ng add @nrwl/nest`      |
| [🔗 Express](https://expressjs.com)       | `ng add @nrwl/express`   |
| [🔗 Node](https://nodejs.org)             | `ng add @nrwl/node`      |
| [🔗 Storybook](https://storybook.js.org/) | `ng add @nrwl/storybook` |

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

### Unit testing via [🔗 Jest](https://jestjs.io)

To execute the unit tests run:

```bash
ng test my-app
```

To execute the unit tests affected by a change run:

```bash
npm run affected:test
```

### End-to-end testing via [🔗 Cypress](https://www.cypress.io)

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

### Further help

Visit the [🔗 Nx Documentation](https://nx.dev) to learn more.

## Technologies Reference

### Workspace

[🔗 Nrwl Nx](https://nx.dev)

### Client

[🔗 Angular](https://angular.io)

[🔗 Angular CLI](https://cli.angular.io/)

[🔗 Angular Material](https://material.angular.io/)

[🔗 Apollo Angular](https://github.com/apollographql/apollo-angular)

[🔗 Material Design Guidelines](https://material.io)

[🔗 NGXS](https://www.ngxs.io/)

### Server

[🔗 NestJS](https://nestjs.com/)

[🔗 Firebase JS Reference](https://firebase.google.com/docs/reference/js/)

[🔗 Express GraphQL Server](https://graphql.org/graphql-js/running-an-express-graphql-server/)

[🔗 Angular Firebase: Apollo Server](https://angularfirebase.com/lessons/graphql-apollo-2-tutorial-node/#Apollo-Server)

[🔗 GRPC](https://grpc.io/)

### Testing

[🔗 Cypress](https://www.cypress.io/)

[🔗 Jest](https://jestjs.io/)

### Documentation

[🔗 Compodoc](https://compodoc.github.io/compodoc/)

### CI

[🔗 Azure DevOps](https://azure.microsoft.com/en-us/services/devops/)

[🔗 Azure DevOps Pipeline YAML Schema](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema?view=vsts&tabs=example#trigger)
