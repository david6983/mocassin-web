# Mocassin Web App - generate data structures in C

## Introduction

This project is the web app version of the [Mocassin](https://github.com/david6983/mocassin) software written in [Kotlin](http://kotlinlang.org/)
and the ui framework [TornadoFx](https://tornadofx.io/). 

Mocassin is a graphical interface to generate data structures such as simple linked list in C programming. 
The idea comes from my first classes of C when I learned how to create linked lists. 
I wanted to generalize the variables inside linked lists without using `void*`. 
My teacher told me that we can use union in C and add as many type as we want in a linked list. 
The main issue I found with `void*` is, in my opinion, not type-safe to use.

Nowadays I know that most of the implementation of linked list use `void*` 
such as [GLIB Singly-Linked-Lists ](https://developer.gnome.org/glib/stable/glib-Singly-Linked-Lists.html) or 
[GermainLib](https://github.com/ANTUNESREMI/GermainLib). However, Mocassin provides a safe-type way of generating data structures in C
which is working pretty well.

## Why did I create a web app version ? What are the issues to link the two versions ?

The first milestone of this project is to show up how a web version powered by a Javascript framework like [Angular](http://angular.io/) 
is much more powerful and complete than a heavy desktop client using [Java](https://www.java.com/).

Secondly, to make this web version to work in pairs with the desktop version, there are some model's issues to consider before successfully
link the two versions: the generation of the C code using [freemarker](https://freemarker.apache.org/) template engine. By looking at the `.ftl` files, I noticed
that the template can read `kotlin` data structures. Let's say I use a Javascript library like [freemarker Node JS](https://www.npmjs.com/package/freemarker), my templates are nearly
incompatible with a Javascript json model. I also need to set the path environment variable `JAVA_HOME` which is not convenient for a web app.
    
Therefore, for the second milestones, I would like the web application to create basic C language such as `Enum`, `Struct`, `Union`. 
All of this data structures will be grouped and called `user's model`. Then the web application will generate a `.moc` file in order to save this model and which can be imported in the
desktop app. In a nutshell, only the desktop client can generate C files at the moment until I refactor the template engine system between the two apps.

This project has been generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

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
