# TypeScript

## Introduction

This repo will contain the code and notes for the course: [The Ultimate TypeScript Course](https://codewithmosh.com/courses/enrolled/1779784).

## Table of Contents

- [Section 1: Getting Started with TypeScript](#section-1-getting-started-with-typescript)
- [Section 2: TypeScript Fundamentals](#section-2-typescript-fundamentals)
- [Section 3: Advanced Types](#section-3-advanced-types)

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

In TypeScript, we annotate our variables with their types in order to declare data types.

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
- With typed Arrays, when performing an array method on a typed array, only methods and properties which are available for said type will be shown
- This is not possible with vanilla JS

### Tuples

Tuple is a new data type introduced by TS, which is a fixed length array, wherein each element has a particular type.

- A tuple can be declared as so:

```typescript
let user: [number, string] = [1, "Rakib"];

// Error due to extra value
let user: [number, string] = [1, "Rakib", 3];
```

- In the example code, the second line would return an error as our defined tuple has a fixed value of 2, which it
- Tuples are compiled to normal JS Arrays:

```typescript
let user: [number, string] = [1, "Rakib"];

// Compiles to
let user = [1, "Rakib"];
```

- As a best practice, tuples should be restricted to 2 values e.g. key, value pairs, as anything larger can make code unreadable

### Enums

Enums are another TS specific type, which represents a list of related constants

Example:

```typescript
let small = 1;
let medium = 2;
let large = 3;

// We can reference these sizes throughout our code

// PascalCase naming convention for both enum and values
const enum Size {
  // Default value of 0 ascending
  Small = 1, //Giving an intial value, it will increment from there
  Medium,
  Large,
}

// Declared a variable of type Size, with the value 2
let rakibSize: Size = Size.Medium;
```

- As seen in the example above, enums, automatically increment from a default value of 0
  - This value can be overwritten with another number
- Enums can also be overwritten to contain other types, however all types must stay consistent
- It is best practice to use the `const` keyword for more optimised JS code upon compilation

### Functions

In TypeScript, there are 2 things we need to keep in mind regarding functions

- The types of the parameters of the function
- The type of the value being returned by the function

```typescript
function calculateSquare(num: number): number {
  // Valid
  return num * num;

  // Raises an error
  return "a";
}
function printHello(): void {
  console.log("Hello World!");
}
```

- As seen above, both the function iteself and its parameters are annotated with types
- The function annotation specifies what type of value is returned
  - In the case that the function doesn't return anything we can use the `void` keyword
- By default, TS does not notify us if there are any unused parameters
  - We can enable this in the tsconfig file through the `noUnusedParameters` option

No Implicit Returns:

- The `NoImplicitReturns` setting, will check for whether we have implicit `any` types in our code e.g. an if statement without an else
- In the below code, since we have an if statement without an else, if the income is over 50k it would return undefined.

```typescript
function calculateTax(income: number): number {
  if (income < 50000) {
    return income * 1.2;
  }
  // No else case, it will return undefined
  else {
    return income * 1.1;
  }
}
```

No Unused Locals:

- In cases where we declare variables without using them, the `NoUnusedLocals` setting can be helpful
- It is also possible to make function parameters optional by using the `parameter?: type` syntax

Objects:

In JavaScript, objects are dynamic, and properties can be added to them after being declared

- In TypeScript however, objects also have to be annotated with the properties, and types of their values
- In certain cases, we might want to initialise an object without a certain property
  - the `parameter?: type` syntax can also be used here
- As objects can contain functions, any function also has to be annotated

```typescript
let employee: {
  // Annotation for the person object
  readonly id: number;
  name: string,
  retire: (date: Date) => void;
} = {
   id: 1,
   name: "Rakib",
   retire(data:Date)=>{
  console.log(date)
}
};
```

- In the above example, the employee object has annotations for all its properties
- As the values of an object can change and is dynamic, we can use the `readonly` property on the ID
- the retire function is also annotated to take in a date argument and return nothing

## Section 3: Advanced Types

### Type Aliases

There are multiple problems present in the object implementation in the previous section:

- Firstly, if we were to create another employee object, we'd have to repeat the annotations
  - Goes against DRY principles
- If we were to create another employee object, it may have other properties, as of right now we do not have a specific way of defining the structure of an employee object
- The syntax used previously is a bit hard on the eyes and can make the code hard to read

This is where Type Aliases come in:

```typescript
type Employee = {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
};

// We can now simplify our objects

let employee: Employee={
   id: 1,
   name: "Rakib",
   retire(data:Date)=>{
  console.log(date)
  }
}
```

- With type aliases, we are able to define the structure of an object in one place, and create our own custom types

### Union Types

Union types allow for variables/function parameters to have more than 1 type

- Union types are denoted through the use of the `|` character
- When using union types, a technique called narrowing is used to dictate what to do based on the type of the argument

```typescript
function kgToLb(weight: number | string) {
  if (typeof weight == "number") return weight * 2.2;
  else return parseInt(weight) * 2.2;
}
```

### Intersection types

Intersection types check for whether a value satisfies all type conditions defined in the annotation

- The `&` is used to denote an intersection type

```typescript
// First we create 2 Type Aliases

// Object of type draggable has method drag
type Draggable = {
  drag: () => void;
};

// Object of type resizable has method resize
type Resizable = {
  resize: (width, height) => void;
};

// Intersection type
type UIWidget= Resizable && Draggable

let textBox: UIWidget={
  drag:()=> {},
  resize:(width, height) => {}
}
```

- The above object textBox is of type UIWidget (an Intersection Type), as it has both a drag and resize method, both which are respective methods of the Resizable and Draggable types

### Literal Types

- Literal types are a way to ensure that variables contain a specific value
- By themselves, they are not really useful, but they can be used in conjunction with intersection types
- Literal types can be of any type

```typescript
// Creating a literal type quantity that can only be 1 of 2 specified values
type Quantity = 50 | 100;

// Raises an error
let quantity: Quantity = 200;

let quantity: Quantity = 50;

// This literal type accepts either 1 of 2 specified strings
type Metric = "cm" | "inch";
```

### Nullable Types

In JavaScript, both `null` and `undefined` can be the source of many errors in code. Therefore, such values need to be taken into consideration and handled correctly.

```typescript
function greet(name: string | null | undefined) {
  if (name) console.log(`Hello ${name.toUpperCase()}`);
  // In cases of null and undefined
  else console.log("Hello Stranger");
}
```

### Optional Chaining

When working with Nullable Objects, we have to do null checks in certain cases

```typescript
// Customer type contains a birthday property of type Date
// Optional property allows the option to have a birthday property or not
type Customer = { birthday?: Date };

// Get customer from db
function getCustomer(id: number): Customer | null | undefined {
  // If id is 0 return null otherwise return customer object
  return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(0); //Returns null

// Will not execute since the type of customer is null
if (customer !== null && customer !== undefined) console.log(customer.birthday);

// Simplified using optional property access operator

// Only if we have a customer
console.log(customer?.birthday);

// Only if we have a customer who has a birthday
console.log(customer?.birthday?.getFullYear());
```

- As seen in the code above, the optional property access operator is denoted by `?.` syntax
  - It allows for the birthday to print only if the customer object is returned
  - In the second line, only if a customer with a birthday property is returned will it print the full year
  - In both cases if the condition is not satisfied, it will print `undefined`

Essentially the optional property/element/call access operator `?.`, can be used in place of:

```typescript
if(customers !=='undefined' && customers !=='null')
  // do something
```

Examples:

- Objects - propery access operator: `customer?.birthday`
- Arrays - element access operator: `customers?.[0]`
- Functions - optional call:

```typescript
let log: any = null;
// Will only execute if log references a function, otherwise we get undefined
log?.("a");
```

### The Nullish Coaelscing Operator

When working with null/undefined values, sometimes we need to fall back to a default value

For example:

```typescript
let speed: number | null = null;
let ride = {
  speed: speed || 30,

  //Simplified form of speed !== null? speed: 30
  speed: speed ?? 30,
};
```

- In the above example, we are prone to error, as the conditional is checking for falsy values, wherein 0, a valid speed can be evaluated to false
- The second implementation avoids this by using our annotated speed variable, which is guaranteed to be of type number of null
- This is done through the use of the Nullish Coaelscing Operator

### Type Assertions

There are certain cases where we know more about an object then TypeScript. For instance, we know that the document object, contains many methods in reference to the DOM:

- As seen in the example below, type assertions are used when we know more about the object than TS
- With Type Assertion there is no type checking for the variable, so it should be used carefully
- Type Assertion can be denoted in one of two ways
  - The `as` Syntax
  - The `<Assertion>` Syntax

```ts
let phone = document.getElementById("phone") as HTMLInputElement;
let phone = <HTMLInputElement>document.getElementById("phone");

// Interperted as a HTMLElement, so we cannot access the value
// With the assertion we can now access the value property
phone.value;
```
