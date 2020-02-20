# NxNgStarter

## Azure DevOps pipelines status

- ### PR Validation [![Azure DevOps PR Validation Build Status](https://rfprod.visualstudio.com/nx-ng-starter/_apis/build/status/PR%20Validation?branchName=master)](https://rfprod.visualstudio.com/nx-ng-starter/_build/latest?definitionId=13&branchName=master)

- ### PROD [![Azure DevOps PROD Build Status](https://rfprod.visualstudio.com/nx-ng-starter/_apis/build/status/PROD?branchName=master)](https://rfprod.visualstudio.com/nx-ng-starter/_build/latest?definitionId=14&branchName=master)

## Project description

`NxNgStarter` is a monorepo starter with preconfigured apps:

- `api` - provides sample api using rest and graphql
- `nx-ng-starter` - sample client application
- `nx-ng-starter-e2e` - sample client application e2e tests

and libs:

- `api-interface` - api interface for sample `api` application
- `mocks-core` - library used for unit testing mostly, contains different mocks
- `shared-core` - shared core library, contains shared classes

which is deployed to `Firebase`: https://nx-ng-starter.web.app/

## Deployment

- [Nx Ng Starter @ Firebase](https://nx-ng-starter.web.app)

### Unit Coverage

- [Nx Ng Starter Client](https://nx-ng-starter.web.app/coverage/nx-ng-starter/index.html)
- [Nx Ng Starter API](https://nx-ng-starter.web.app/coverage/api/index.html)

### E2E Reports

- [Nx Ng Starter E2E](https://nx-ng-starter.web.app/cypress/nx-ng-starter-e2e/mochawesome/mochawesome.html)

### Documentation

- [Nx Ng Starter Client](https://nx-ng-starter.web.app/documentation/nx-ng-starter/index.html)
- [Nx Ng Starter API](https://nx-ng-starter.web.app/documentation/api/index.html)

### Changelog

- [Nx Ng Starter](https://nx-ng-starter.web.app/changelog/apps/nx-ng-starter-CHANGELOG.md)
- [API](https://nx-ng-starter.web.app/changelog/apps/api-CHANGELOG.md)
- [API Interface](https://nx-ng-starter.web.app/changelog/libs/api-interface-CHANGELOG.md)
- [Mocks Core](https://nx-ng-starter.web.app/changelog/libs/mocks-core-CHANGELOG.md)
- [Shared Core](https://nx-ng-starter.web.app/changelog/libs/shared-core-CHANGELOG.md)

## General Tooling

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Angular CLI power-ups for modern development.**

### Quick Start & Documentation

[Nx Documentation](https://nx.dev)

[30-minute video showing all Nx features](https://nx.dev/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

### Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, .etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

### Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@nx-ng-starter/mylib`.

### Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

### Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `npm run affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `npm run affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `npm run dep-graph` to see a diagram of the dependencies of your projects.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## Troubleshooting

### Windows

- git config --global core.autocrlf

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

### Testing

- [Cypress](https://www.cypress.io/)
- [Jest](https://jestjs.io/)

### Documentation

- [Compodoc](https://compodoc.github.io/compodoc/)

### CI

- [Azure DevOps YAML Schema](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema?view=vsts&tabs=example#trigger)
