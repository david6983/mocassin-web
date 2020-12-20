# Installation

# Prerequisites

- Angular Cli **11.0.1** (do not use the **8.3.5** because it's not compatible with the last version of [primeng](primefaces.org/primeng/showcase/#/))
- Install `npm i -g json-server`
- npm

# Development mode

1. Make sure you have `db.json`
2. Launch the REST API server `json-server db.json`
3. `ng serve`
4. http://localhost:4200/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## What to read next

- [Welcome page](welcome.md)
- [How to use mocassin](tuto.md)
- [The design story](design.md)

