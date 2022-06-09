# TypeScript

## Introduction

This repo will contain the code and notes for the course: [The Ultimate TypeScript Course](https://codewithmosh.com/courses/enrolled/1779784).

## Table of Contents

- [Section 1: Getting Started with TypeScript](#section-1-getting-started-with-typescript)
- [Section 2: TypeScript Fundamentals](#section-2-typescript-fundamentals)

## Section 1: Getting Started with TypeScript

### What is TypeScript?

- TypeScript is a programming language that is a strict syntactical superset of JavaScript.
- TypeScript is a statically typed language, as opposed to JavaScript, meaning that the type of variables are fixed, and will be determined at compile time, as opposed to JavaScript where variable types can change after runtime
- Therefore, with TypeScript, our code is compiled at runtime in order to perform type checking and check for errors, and then converted into JavaScript code.
- Since this type checking occurs at compile time, we can check for errors without having to actually run the app or any tests.

- During the compilation process, our TypeScript code is compiled and translated into JavaScript, this process is known as `Transpilation`

### Setting Up the Development Environment

- Run `npm i -g typescript` will globally install and allow for the use of the TypeScript compiler from any folder
- Check for a succesful installation using `tsc -v`

### First TypeScript Program

- All TypeScript files are identified through the `.ts` extension
- As evident, upon compiling our code, the `let` keyword has been converted into a `var`
  - This is because TypeScript converts our code to ES5 JavaScript by defualt

### Configuring the TypeScript Compiler

- We can create config files through the terminal by using `tsc --init`
- This will create a config file with the default setting of compiling to ES6
- The config file has multiple properties which we can change

  - the `target` property, allows us to specify which version of JS our code will compile to
  - the `rootDir` property, specifies where our source code will be i.e. the code to be compiled
  - the `outDir` property, specifies where our compiled JS code will be outputted
  - The `removeComments` setting removes all comments on compilation
  - The `noEmitOnError` property prevents our code from compiling in the case of errors

- Now that we've configured our settings, we can just type `tsc`, to compile all our code at once since, we've specified the rootDir

### Debugging TypeScript in VSCode

- In `tsconfig.json` enable the `sourceMap` property

  - By doing this, upon compilation a source map file will also be generated which will map our TS code to our compiled JS code

- Now, we can set breakpoints in our code and launch the debugger using the Node preset
- Doing this will create a `launch.json` file
- In this file we need to add `"preLaunchTask:": "tsc: build - tsconfig.json"`
- We can now launch the debugger using F5

## Section 2: TypeScript Fundamentals

### Built-in Types

JavaScript comes with a range of built in data-types such as:

- Number
- String
- Boolean
- null
- undefined
- object

TypeScript extends this by introducing new types such as:

- any
- unknown
- never
- enum
- tuple

### Declaring Types

With TypeScript, we annotate our variables with their types in order to declare data types.

If no type is declared, but a value has already been given to the variable, the TS compiler will automatically infer types based on values

So the following code:

```typescript
let age: number = 22;
let course: string = "TypeScript";
let isValid: boolean = true;
```

Can be simplified to:

```javascript
let age = 22;
let course = "TypeScript";
let isValid = true;
```

### The `any` Type

In TypeScript, if we declare a variable without initialising it, TS will automatically assign it the type of `any`

- A variable with type `any` can be assigned values of any data type, and behaves like a normal JS variab;e
- As this goes against the whole point of using TS, it should be avoided when possible
- An example use of any can be in function parameters:

```typescript
function render(document: any) {
  console.log(document);
}
```

### Arrays

In JavaScript, arrays are dynamic and can contain multiple values of different types. If we pass such an array to a function which expects values of one type, it can raise issues.

- We can define an array in TypeScript as so:

  ```typescript
  let numbers: number[] = [1, 2, "3"];
  ```

- Doing so will allow for the compiler to detect type errors

- Again it is also possible to declare an empty array
- Doing so will give it the any type
- In such a case, for an empty array it's best to declare the type of the array

  ```typescript
  //Type: any
  let numbers = [];

  //Type: number
  let numbers: number[] = [];
  ```

- An extra benefit of TS, is how well it works in conjunction with intelliSense
- With typed Arrays, when performing an array method on a typed array, only methods which are available for said type will be shown
- This is not possible with vanilla JS
