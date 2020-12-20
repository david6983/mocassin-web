# Mocassin Web App - generate data structures in C

![home](doc/screenshots/1-home.png)

## Introduction

This project is the web app version of the [Mocassin](https://github.com/david6983/mocassin) software written in [Kotlin](http://kotlinlang.org/)
and the ui framework [TornadoFx](https://tornadofx.io/). 

## What is the desktop software Mocassin ?

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
    
Therefore, I decided to create a simpler version of the software to have a most valuable product ready for the users before waiting all features, 
Now, I would like the web application to create basic C language such as `Enum`, `Struct`, `Union`. 
All of this data structures will be grouped and called `user's model`. Then the web application will generate a preview of the `c` code that can be copied to the clipboard.

In the future, I would like to see the security risks of downloading a `.moc` file of the code encoded by the app to be compatible with the desktop version

So far, only the desktop client can generate C files at the moment until I refactor the template engine system between the two apps.

**NOTE**: This project has been generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1 because I used the [primeng framework](primefaces.org/primeng/showcase/#/).

## Documentation

Go to the [Welcome page](doc/welcome.md) to get more information.

- [Welcome page](doc/welcome.md)
- [How to install mocassin on your own](doc/install.md)
- [How to use mocassin](doc/tuto.md)
- [The design story](doc/design.md)
