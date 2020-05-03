# NxNgStarter

Angular NestJS Nx starter project with workflow automation.

## Azure DevOps

| Pipeline      | Status                                                                                                                                                                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PR Validation | [![Azure DevOps PR Validation Build Status](https://rfprod.visualstudio.com/nx-ng-starter/_apis/build/status/PR%20Validation?branchName=master)](https://rfprod.visualstudio.com/nx-ng-starter/_build/latest?definitionId=13&branchName=master) |
| PROD          | [![Azure DevOps PROD Build Status](https://rfprod.visualstudio.com/nx-ng-starter/_apis/build/status/PROD?branchName=master)](https://rfprod.visualstudio.com/nx-ng-starter/_build/latest?definitionId=14&branchName=master)                     |

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

[:link: Yarn](https://www.npmjs.com/package/yarn) is a preferred package manager for dependencies installation in the project root.
[:link: npm](https://www.npmjs.com/) is a preferred package manager for dependencies installation in the `functions` folder.

### Committing changes to repo

Using [:link: commitizen cli](https://github.com/commitizen/cz-cli) is mandatory.

Provided all dependencies are installed, and [:link: commitizen cli is installed as a global dependency](https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility), this command must be used.

```bash
git cz
```

## GitBook documentation

Is generated based on GitHub repo.

[:link: GitBook documentation](https://rfprod.gitbook.io/nx-ng-starter/)

## Firebase deployment

### Application

[:link: Nx Ng Starter Webapp](https://nx-ng-starter.web.app)

### Unit coverage

[:link: Nx Ng Starter Client](https://nx-ng-starter.web.app/coverage/nx-ng-starter/index.html)
[:link: Nx Ng Starter API](https://nx-ng-starter.web.app/coverage/api/index.html)

### E2E reports

[:link: Nx Ng Starter E2E](https://nx-ng-starter.web.app/cypress/nx-ng-starter-e2e/mochawesome/mochawesome.html)

### Compodoc documentation

[:link: Nx Ng Starter Client documentation](https://nx-ng-starter.web.app/documentation/nx-ng-starter/index.html)
[:link: Nx Ng Starter API documentation](https://nx-ng-starter.web.app/documentation/api/index.html)

### Changelog

[:link: Nx Ng Starter](https://nx-ng-starter.web.app/changelog/apps/nx-ng-starter-CHANGELOG.md)
[:link: API](https://nx-ng-starter.web.app/changelog/apps/api-CHANGELOG.md)
[:link: API Interface](https://nx-ng-starter.web.app/changelog/libs/api-interface-CHANGELOG.md)
[:link: Mocks Core](https://nx-ng-starter.web.app/changelog/libs/mocks-core-CHANGELOG.md)
[:link: Shared Core](https://nx-ng-starter.web.app/changelog/libs/shared-core-CHANGELOG.md)

## General Tooling

This project was generated using [:link: Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Angular CLI power-ups for modern development.**

### Quick Start & Documentation

[:link: Nx Documentation](https://nx.dev)

[:link: 30-minute video showing all Nx features](https://nx.dev/getting-started/what-is-nx)

[:link: Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

### Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, .etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

[:link: Angular](https://angular.io)

```bash
ng add @nrwl/angular
```

[:link: React](https://reactjs.org)

```bash
ng add @nrwl/react
```

Web (no framework frontends)

```bash
ng add @nrwl/web
```

[:link: Nest](https://nestjs.com)

```bash
ng add @nrwl/nest
```

[:link: Express](https://expressjs.com)

```bash
ng add @nrwl/express
```

[:link: Node](https://nodejs.org)

```bash
ng add @nrwl/node
```

[:link: Storybook](https://storybook.js.org/)

```bash
ng add @nrwl/storybook
```

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

### Unit testing via [:link: Jest](https://jestjs.io)

To execute the unit tests run:

```bash
ng test my-app
```

To execute the unit tests affected by a change run:

```bash
npm run affected:test
```

### End-to-end testing via [:link: Cypress](https://www.cypress.io)

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

Visit the [:link: Nx Documentation](https://nx.dev) to learn more.

## Technologies Reference

### Workspace

[:link: Nrwl Nx](https://nx.dev)

### Client

[:link: Angular](https://angular.io)
[:link: Angular CLI](https://cli.angular.io/)
[:link: Angular Material](https://material.angular.io/)
[:link: Apollo Angular](https://github.com/apollographql/apollo-angular)
[:link: Material Design Guidelines](https://material.io)
[:link: NGXS](https://www.ngxs.io/)

### Server

[:link: NestJS](https://nestjs.com/)
[:link: Firebase JS Reference](https://firebase.google.com/docs/reference/js/)
[:link: Express GraphQL Server](https://graphql.org/graphql-js/running-an-express-graphql-server/)
[:link: Angular Firebase: Apollo Server](https://angularfirebase.com/lessons/graphql-apollo-2-tutorial-node/#Apollo-Server)
[:link: GRPC](https://grpc.io/)

### Testing

[:link: Cypress](https://www.cypress.io/)
[:link: Jest](https://jestjs.io/)

### Documentation

[:link: Compodoc](https://compodoc.github.io/compodoc/)

### CI

[:link: Azure DevOps YAML Schema](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema?view=vsts&tabs=example#trigger)
