# nx-ng-starter

A modern, full-stack monorepo starter built with **Nx**, **Angular**, **Node.js**, and **Firebase**. Ship web, mobile, and desktop applications from a single repository with GraphQL, real-time database integration, and enterprise-grade tooling.

[![Nx](https://img.shields.io/badge/Nx-23-143055?logo=nx&logoColor=white)](https://nx.dev)
[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)](https://angular.io)
[![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![NestJS](https://img.shields.io/badge/NestJS-12-FF0000?logo=nestjs&logoColor=white)](https://nestjs.com)
[![Firebase](https://img.shields.io/badge/Firebase-Cloud-FFA000?logo=firebase&logoColor=white)](https://firebase.google.com)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

**nx-ng-starter** is a starter template that eliminates boilerplate configuration for modern full-stack applications. It combines the monorepo power of **Nx** with the reactive paradigm of **Angular**, a scalable **Node.js** backend, and **Firebase** for authentication, database, and deployment.

Whether you're building a web application, a mobile app with **Capacitor**, a desktop app with **Electron**, or all three — this starter provides the foundation with best practices baked in.

## Key Features

- **Monorepo Architecture** — Manage multiple apps and libraries in one workspace using Nx
- **Full-Stack JavaScript/TypeScript** — Shared code between frontend and backend
- **Firebase Integration** — Firestore database, Realtime Database, Authentication, Cloud Functions, and Hosting
- **GraphQL Support** — Schema-driven API development with type safety
- **Multi-Platform** — Web, Android (Capacitor), and Desktop (Electron) from shared code
- **Docker Ready** — Containerized deployment for Node.js backend and services
- **Enterprise Tooling** — ESLint, Prettier, Jest, Cypress, and Storybook preconfigured
- **CI/CD Workflows** — GitHub Actions for automated testing and deployment
- **Real-Time Capabilities** — Firebase Realtime Database and Firestore for live data sync

## Technology Stack

| Layer                 | Technology                                                                                   | Purpose                                                           |
| --------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Frontend**          | [Angular](https://angular.io)                                                                | The framework for building scalable web applications.             |
| **Frontend**          | [Angular Material](https://material.angular.io/)                                             | Material design components for Angular.                           |
| **Frontend**          | [NgRx](https://ngrx.io/)                                                                     | User Interface state management.                                  |
| **Mobile**            | [Capacitor](https://capacitorjs.com/)                                                        | Cross-platform Android applications.                              |
| **Desktop**           | [Electron](https://www.electronjs.org/)                                                      | Cross-platform desktop applications.                              |
| **Backend**           | [NestJS](https://nestjs.com/)                                                                | Node.js framework for building scalable server-side applications. |
| **Backend**           | [Express GraphQL Server](https://graphql.org/graphql-js/running-an-express-graphql-server/)  | Type-safe API layer.                                              |
| **Documentation**     | [Compodoc](https://compodoc.github.io/compodoc/)                                             | Documentation tool form Angular frontends and NestJS backends.    |
| **Quality Assurance** | [Vitest](https://vitest.dev/)                                                                | Next generation unit testing framework.                           |
| **Quality Assurance** | [Cypress](https://www.cypress.io/)                                                           | Versatile browser testing framework.                              |
| **Database**          | [Firestore / Realtime Database](https://firebase.google.com/docs/database/rtdb-vs-firestore) | Cloud-hosted database.                                            |
| **Authentication**    | [Firebase Auth](https://firebase.google.com/docs/auth/)                                      | User identity and access control.                                 |
| **Deployment**        | [Firebase Hosting & Cloud Functions](https://firebase.google.com/docs/hosting/functions)     | Serverless deployment infrastructure.                             |
| **Containerization**  | [Docker](https://www.docker.com/)                                                            | Containerized services.                                           |
| **Build Tool**        | [Nx](https://nx.dev)                                                                         | Monorepo build orchestration.                                     |
| **Package Manager**   | [Yarn](https://www.npmjs.com/package/yarn)                                                   | Deterministic dependency management.                              |
| **CI/CD**             | [GitHub Actions](https://github.com/features/actions)                                        | Software workflow automation.                                     |

## Requirements

### Before setting up, ensure you have:

- [**Bash 5**](https://www.gnu.org/software/bash/)
- [**Node.js**](https://nodejs.org/)
- [**Yarn**](https://yarnpkg.com/)
- [**Git**](https://git-scm.com/)
- [**Firebase**](https://firebase.google.com)
- [**Docker**](https://www.docker.com/)

### Package managers:

- [Yarn](https://www.npmjs.com/package/yarn) - preferred for dependencies installation in the project root.
- [npm](https://www.npmjs.com/package/npm) - preferred for dependencies installation in the `functions` folder.

### Supported operating systems:

- [Debian based Linux](https://en.wikipedia.org/wiki/List_of_Linux_distributions#Debian-based) - `recommended`
  - check out [this dev setup instructions](https://github.com/rfprod/wdsdu) to facilitate setting up the dev environment;
  - given that the dev environment is set up, the command `yarn install:all:linux` should install everything needed to work with the project;
- [OSX](https://en.wikipedia.org/wiki/MacOS) - `should work due to its similarity to Linux`
  - one will have to figure out oneself how to set up the dev environment;
  - given that the dev environment is set up, the command `yarn install:all:osx` should install everything needed to work with the project;
  - the automation scripts support the OS with relatively high probability, but it has not been tested;
- [Windows](https://en.wikipedia.org/wiki/Microsoft_Windows) - `should work, but no guarantees`
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

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rfprod/nx-ng-starter.git
cd nx-ng-starter
```

### 2. Install Dependencies, Setup Git Hooks, and Compile Workspace Executors

```bash
yarn setup
```

### 3. Configure Firebase (Required for Deployment)

Create a `firebase.json` file in the root directory with your Firebase project credentials:

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

Alternatively, set environment variables:

```bash
export FIREBASE_PROJECT_ID=your-project-id
export FIREBASE_API_KEY=your-api-key
```

### 4. Start Development

```bash
yarn start
```

This will start:

- **Web app**: http://localhost:4200
- **API server**: http://localhost:8080
- **Nx dev server**: Watches for changes and rebuilds automatically

### 5. Commit Changes

Follow the [Trunk Based Development methodology](https://trunkbaseddevelopment.com/) to propose changes to the `main` branch.

Using [commitizen cli](https://github.com/commitizen/cz-cli) is mandatory.

Provided all dependencies are installed, and [commitizen cli is installed as a global dependency](https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility), this command must be used.

```bash
git cz
```

## Command Discovery

### All Supported Commands

Find all supported commands:

```bash
npx nx run tools:help
```

### Running Applications

Find all supported `start` commands:

```bash
npx nx run tools:help --search start
```

### Building Applications

Find all supported `build` commands:

```bash
npx nx run tools:help --search build
```

### Running Tests

Find all supported `test` commands:

```bash
npx nx run tools:help --search test
```

### Deploying Applications

Find all supported `firebase` commands:

```bash
npx nx run tools:help --search firebase
```

### Building Containers

Find all supported `docker` commands:

```bash
npx nx run tools:help --search docker
```

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

## General Tooling

This project was generated using [Nx](https://nx.dev).

- [Nx Documentation](https://nx.dev)
- [30-minute video showing all Nx features](https://nx.dev/getting-started/what-is-nx)
- [Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

## How to contribute to this project?

Refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

---

**Good luck!** 👍
