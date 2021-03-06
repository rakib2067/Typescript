# TypeScript

## Introduction

This repo will contain the code and notes for the course: [The Ultimate TypeScript Course](https://codewithmosh.com/courses/enrolled/1779784).<br/>
The first 3 sections are available for free [here](https://www.youtube.com/watch?v=d56mG7DezGs&ab_channel=ProgrammingwithMosh)

## Table of Contents

- [Section 1: Getting Started with TypeScript](#section-1-getting-started-with-typescript)
- [Section 2: TypeScript Fundamentals](#section-2-typescript-fundamentals)
- [Section 3: Advanced Types](#section-3-advanced-types)
- [Section 4: Classes, Interfaces and Object-oriented Programming](#section-4-classes-interfaces-and-object-oriented-programming)
- [Section 5: Generics](#section-5-generics)
- [Section 6: Decorators](#section-6-decorators)
- [Section 7: Integrating with JavaScript](#section-7-integrating-with-javascript)
- [Section 8: React with TypeScript](#section-8-react-with-typescript)
- [Section 9: Express with TypeScript](#section-9-express-with-typescript)

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

### The Unknown Type

As previously mentioned, the `any` keyword should be avoided, however there are certain cases where we don't know the value of a variable/param

In such cases the `unknown` type is used:

- The `unknown` type causes the compiler to raise errors on method calls from an unknown type
- It also encourages us to use narrowing, to match type cases

```ts
function render(document: unknown) {
  // With any These will not be picked up as errors from the compiler
  document.move();
  document.fly();

  // Narrowing

  if (typeof document == "string") {
    document.toUpperCase();
  }
}
```

### The Never Type

The `never` type represents values that never occur.

```ts
function processEvents(): never {
  while (true) {
    // Read a message from a queue
  }
}

processEvents();

// Line never gets executed due to infinite loop
console.log("Hello world");
```

## Section 4: Classes, Interfaces and Object-oriented Programming

### Creating Classes

In OOP, a class is a blueprint for creating objects, which are instances of the class. A class is made up of both properties and methods.

- In TypeScript, classes have properties along with annotations, whereas in JS properties are only defined in the constructor
- Also, despite being a function, the constructor has no return type, as it will always return an object of the class type

```ts
// Pascal naming convention
class Account{
  id: number,
  owner:string,
  balance:number

  // does not need annotation as it will always return type Account
  constructor(id:number, owner:string,balance:number){
    this.id=id;
    this.owner=owner;
    this.balance=balance;
  }
  deposit(amount:number): void{
    if(amount<0)
      throw new Error('Invalid Amount');
    this.balance += amount;
  }
}
```

### Creating Objects

Now that we have a class, we can begin to create instances of said class.

- In the code below, it is evident that the typeof operator is unreliable, as it only returns `object` and not the actual class
- Therefore, its better suited to use the `instanceof` keyword to check for a specfic type as it returns a boolean expression and is more reliable

```ts
let account = new Account(1, "Rakib", 1000);
account.deposit(100);

// Will return 'object'
console.log(typeof account);

// Will return true
console.log(account instanceof Account);
```

### Readonly and Optional

TypeScript allows us to add modifiers to our variables, in order to write more robust code. Examples are both the `readonly` and `optional` modifiers

- The `readonly` modifier, prevents our specified property from being changed anywhere outside of the constructor
- The optional: `?:` operator, allows for us to have optional properties in our classes

```ts
class Account{
  readonly id: number,
  owner:string,
  balance:number,
  nickname?: string
}
```

### Access Control Keywords

- In TypeScript, all class properties and methods are by default public, meaning that they can all be accesses outside of the class.
- This can, however cause issues, say in the case of a transaction, the balance can be changed outside the class using the above code

  - In such a case, we do not know who paid how much money and when. i.e. We don't have a record of a transaction

- We can use the `private` keyword, to protect our properties and methods, so that they can only be accessed inside the class
  - Proteced properties are usually prefixed with an `_` as seen with `_balance`
  - We can then create getter methods for reading these protected values

```ts
class Account{
  readonly id: number,
  owner:string,
  private _balance:number,
  nickname?: string

  constructor(id:number, owner:string,balance:number){
    this.id=id;
    this.owner=owner;
    this._balance=balance;
  }

  // Private so deposit can only be accessed within the class
  private deposit(amount:number): void{
    if(amount<0)
      throw new Error('Invalid Amount');
    this._balance += amount;
  }

  getBalance(): number{
    return this._balance
  }
}

let account = new Account(1, "Rakib", 1000)

account.balance=10 // Bad implementation as it is public and no record of transaction

account.getBalance() // returns 1000
```

### Parameter Properties

Using the access control keywords in our constructor parameters, it is possible to further simplify our code. These are known as parameter properties

- The previous class syntax requires a lot of code and can be simplified
- By using `public` in our constructor parameters, we tell the compiler to create a public property of a given name and initialise it in one go
- The same syntax applies to `private` properties too, only again they must be prefixed with an `_`.

```ts
class Account{
  // Below properties can now be omitted due to use of public

  // readonly id: number,
  // owner:string,
  // _balance:number,
  nickname?: string

  constructor(public readonly id:number,
              public owner:string,
              private _balance:number){
    // this.id=id;
    // this.owner=owner;
    // this._balance=balance;
  }
```

### Getters and Setters

We previously defined a method `getBalance` to get the value of the private property balance. There is however, a cleaner way of doing so with the use of getters and setters:

- In the code below, we've modified the class to have getters and setters
  - `getBalance()` has been replaced with `get balance`, and returns the value of the private property `_balance`
  - The setter follows the same syntax, only it does not return a value and allows one to perform validation
- The use of setters and getters prevent the direct mutation of class properties
- Both can be called on an instance of a class, without parenthesis.

```ts
class Account {
  getBalance(): number {
    return this._balance;
  }

  // Simplified to
  get balance(): number {
    return this._balance;
  }

  // Setter to set value of private property
  set balance(value: number) {
    if (value < 0) {
      throw new Error("Invalid Value!");
    }
    this._balance = value;
  }
}

console.log(account.balance);
account.balance = 10;
```

### Index Signatures

In vanilla JavaScript, it is possible to create an empty object, and dynamically add properties on later as so:

```js
// Valid JS Code:
let user = {};
user.name = "Rakib";
user.age = 22;
```

This implementation would not work in TypeScript, as TS is very strict about the shape of objects.
Despite this, it is still possible to implement dynamic properties through the use of index signatures:

- In the example code, we have a class `SeatAssignment`, to manage who is sitting where
- Instead of creating multiple properties for each seat we use an `Index Signature Property`
  - Firstly, we define the property name, and the type of the property name
  - Then we annotate the type of value said key will hold

```ts
class SeatAssignment {
  // A1, A2, A3 etc..
  //Rakib, Mosh, Henry

  //A1:string - Instead of doing multiple properties for seats we can do:

  [seatNumber: string]: string;
}

let seats = new SeatAssignment();
seats.A1 = "Rakib";
seats["A2"] = "Mosh";
```

### Static Members

As previously established, classes allow us to create multiple instances called objects, which each contain their own respectful state through a seperate space in memory that is accessed using the `this` keyword

It is possible, however to have a shared state/data across a class, known as a `static member`, these are known as class Methods/properties:

- In the example code, the Ride class, has a static property `_activeRides` which is set to 0 on initialisation of the first instance
  - We then set it to private, so it cannot be accessed directly, and make it `static`, so it is a class property
- Now we can create a getter, which also uses `static` to return the total active rides.

```ts
class Ride {
  private static _activeRides: number = 0;

  start() {
    Ride._activeRides++;
  }
  stop() {
    Ride._activeRides--;
  }

  static get activeRides() {
    return Rides._activeRides;
  }
}

let ride1 = new Ride();
let ride2 = new Ride();
```

### Inheritance

Where we are planning to create numerous classes with commonalities, Inheritance can be used to prevent code duplication:

- With inheritance, there is a base class which shares properties and methods all its child classes will also share
- Sub classes are made which extend these classes
- Sub classes can contain different properties/methods specific to them and modify existing methods and properties

In the code Below:

- Person is the parent class, and has properties firstName and lastName
- Student is a child class, which has an extra property and method
- Since student is a sub class:
  - `extends` must be used in the class creation
  - `super()` method must be called, along with values respective of parent
  - Parent proprties in the child constructor do not have to be given `public` as they are already created in the parent class

```ts
class Person {
  constructor(public firstName: string, public lastName: string) {}

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  walk() {
    console.log("Walking");
  }
}

class Student extends Person {
  constructor(public studentId: number, firstName, lastName) {
    super(firstName, lastName);
  }

  study() {
    console.log("studying");
  }
}

let student = new Student(1, "Rakib", "Ali");

student.walk();
student.study();
```

### Method Overriding

Sometimes we want to modify methods from parent classes

This can be done through the use of overriding:

- By overriding we are changing the implementation of a parent method
- In the code below, `Teacher` is a subclass, wherein no properties are changed
  - Therefore, there is no need to create a constructor here as we inherit the parent constructor
- We do however change the fullName method

  - This is done using the `override` keyword
  - The super keyword is again used here to carry on the implementation from the original method

- The `override` keyword must be used in these cases, and the `noImplicitOverride` setting in tsconfig is useful to ensure this

```ts
class Teacher extends Person {
  override get fullName() {
    return "Professor: " + super.fullName;
  }
}
```

### Polymorphism

The name Polymorphism refers to 'many forms', and in oop refers to how an object can take many different forms

- In our previous code we've created a Person base class with child classes of Student, Teacher and now Principal
- Each child class has a fullname getter
- However implementation is different for each class

- In our example code, the printName function takes in an array of type Person
  - Since the child classes inherit from Person, they pass the type check
- In the for loop, despite the same method being called on each person, a different output is displayed

This is an example of the `Open Closed Principle`:

- Our Classes should be open for extension (inheritance)
- But Classes should be closed for modification
  - Once a class has been fully tested and working, it should no longer be modified as it can cause breaks in code

```ts
class HeadTeacher extends Person {
  override get fullName() {
    return "Head: " + super.fullName;
  }
}
printName([
  new Student(1, "Rakib", "Ali"),
  new Teacher("Jagan", "Devaraj"),
  new HeadTeacher("Sophie", "Hebdidge"),
]);
function printName(people: Person[]) {
  people.forEach((person) => console.log(person.fullname));
}
```

### Private vs Protected Members

Classes in TypeScript also allow the use of `protected` members:

- Like `private` members, protected members can only be accesed within the containing Class
- The difference is however, is that protected members can also be accessed by child elements of a parent class

  - Private members cannot be accessed by child classes

- Protected members should not be used often, as they can create coupling in applications

```ts
class Person {
  protected walk() {
    console.log(walk);
  }
}
class Student extends Person{
  this.walk() // is valid since is a protected member
}
```

### Abstract Classes and Methods

Abstract classes, are classes which cannot be directly instantiated. Rather, these classes, set up the base blueprints which can then be extended upon with other sub classes:

- Take a shape class to draw on a canvas for instance, it can have base properties which every shape will have, such as color, size, position etc.
- The circle class extends the Shape class with its own implementation for render

- Because `Shape` is an abstract class, it cannot be instantiated as an object itself
  - This is due to the `abstract` prefix
  - It also contains an abstract method `render` that has no implementation
- Abstract classes can contain `abstract methods`. i.e. Methods with no implementation
  - These but also be prefixed with `abstract`, the curly braces removed and the return type must also be specified

```ts
abstract class Shape {
  constructor(public color: string) {}

  // Each shape will have a different render method
  abstract render(): void;
}

class Circle extends Shape {
  constructor(public radius: number, color: string) {
    super(color);
  }

  override render(): void {
    console.log("rendering a circle");
  }
}
```

### Interfaces

In OOP, Interfaces are used to define the interface/shape of an object.

Using a calendar as an example, there are multiple calendar applications available, however they all share some commonalities:

- In the example below, we've defined a Calendar Interface
  - Already, it looks more concise than a class
- Upon compiling this code, there will actually be no JavaScript output

  - This is because interfaces do not exist in JS and there is no way to implement them

- Therefore, the interface we've defined is only used by TS for type checking

- We then implement this interface in class `GoogleCalendar` using the `implements` keyword instead of `extends`
  - By doing this, the class must now contain the same properties and methods of the specified interface

```ts
interface Calendar {
  name: string;
  addEvent(): void;
  removeEvent(): void;
}

interface CloudCalendar extends Calendar {
  // Inherits all properties and methods
  sync(): void; //Method to sync to the cloud
}

// Notice we use implements here instead of extends
class GoogleCalendar implements Calendar {
  constructor(public name: string) {}

  addEvent(): void {
    //implementation
  }
  removeEvent(): void {
    //implementation
  }
}
```

- This implementation can be done through both `Interfaces` and `Abstract` classes
  - The difference being that an `interface` does not compile to anything, so it is more efficient
- In cases where we want some logic in the base class, it is better to use an abstract class
  - This is because `abstract` class can contain normal non-abstract methods, which can be used by child classes

Ultimately:

- Interfaces only define the shape of a class, including the properties and methods it should have

  - They do not have any implementation
  - They compile to nothing in JS

## Section 5: Generics

The code below shows a class for creating key value pairs, the problem being that with the implementation, keys can only be of type number:

- We may want to have keys of multiple types
- This can be implemented using either `any`, or creating a separate class for String KVP's however both solutions are inefficient
- In this case we need a Generic solution, that covers all types

```ts
class KeyValuePair {
  constructor(public key: number, public value: string) {}
}

let pair = new KeyValuePair(1, "Hello"); //Valid
let pair2 = new KeyValuePair("2", "Bye"); //Error
```

### Generic Classes

As evident in the previous code, the problem with our current class implementations is that they do not have options for multiple types
In the case that we need a value to be able to satisfy multiple types, we can use `Generic Classes`:

- Generic classes are identified through the `<>` syntax
- Within the angle brackets, we can specify one or more Generic Type Parameter
- Like normal parameters, these can be called anything

- Now when creating an object, we can again use angled brackets to specify the types of each argument
- However angled brackets are also not needed, as TS can infer the types

```ts
class KeyValuePair<K, V> {
  constructor(public key: K, public value: V) {}
}
let pair = new KeyValuePair<string, string>("3", "Rakib"); //Valid object initialisation using generics

let pair = new KeyValuePair("3", "Rakib"); //Also valid, as types are inferred
```

### Generic Functions

Just like Generic Classes, we can also create Generic Functions/Methods

```ts
function wrapInArray<T>(value: T) {
  return [value];
}

//both valid
let numbers = wrapInArray(1);
let strings = wrapInArray("1");
```

### Generic Interfaces

With TypeScript, we can also make our interfaces Generic

Example:

- In the code below, we are trying to create an interface for fetching data from an api
- The api has 2 endpoints: 1 for users, the other for products

- We first create a generic interface User, which can return data of the type of `Product` or `User`
  - Each respictively containing a property of `title` and `username`
- We then create a fetch function to make the api call, with a return type of Result
  - This is a generic function since the result can be of differing types
- We can then make the interfaces for our User and Products, each containing their own respective properties

```ts
// http://apiservice.com/users
// http://apiservice.com/products

interface Result<T> {
  //used generic to cover both Product and User type
  //Used unions in case no data is returned/error
  data: T | null;
  error: string | null;
}

//Function to fetch data from api, uses a generic for the type of result returned
function fetch<T>(url: string): Result<T> {
  //fake data
  return { data: null, error: null };
}

interface Product {
  title: string;
}

interface User {
  username: string;
}

let result = fetch<User>("http://apiservice.com/users/1");
result.data.username; //Since we are using User type

let result = fetch<Product>("http://apiservice.com/products/1");
result.data.title; //Since we are using Product type
```

### Generic Constraints

It's possible to limit the types of our Generics:

- We can do this by using the `extends` keyword
- We can pass:
  - Union constraints
  - Object constraints
  - Interface Constraints
  - Class Constraints

```ts
interface Person {
  name: string;
}
function echo<T extends number | string>(value: T): T {
  return value;
}

function echo<T extends Person>(value: T): T {
  return value;
}
```

### Extending Generic Classes

As established, classes can be extended to create sub-classes. When Extending a Generic class there are 3 cases we need to consider.

In our code example, `Store` is the generic class that is used to store different types of objects in an array<br/>
We then create 3 Child Classes:

- `CompressibleStore` is a generic subclass where the generic type parameter is passed

  - When creating an object it will be done as so `let store= new CompressibleStore<Product>()`
  - This is because the type param upon object creation can be used in our parent class

- `SearchableStore` contains a Restricted Generic type param

  - Only class types with a propery `name` can be passed
  - This is because we are referencing the property `name` in our `array.find()`

- `ProductStore` is a specific Generic type Subclass
  - As the name suggests, this subclass is used for only Product objects
  - It contains a method `filterByCategory` which only applies to products

```ts
class Product {
  name: string;
  price: number;
}

//Class store will store different kinds of objects: Products, Orders, Carts etc
class Store<T> {
  //An array to store all objects in a store
  //protected so can only be accessed within class and by child classes
  protected _objects: T[] = []; //no need for constructor as its better to initialise empty array upon object creation anyway

  add(obj: T): void {
    this._objects.push(obj);
  }
}

//Passing on Generic type param in child class
class CompressibleStore<T> extends Store<T> {
  compress() {}
}

//Restricted Generic type param
//Only objects that have name property can be used
class SearchableStore<T extends { name: string }> extends Store<T> {
  find(name: string): T | undefined {
    return this._objects.find((obj) => obj.name == name);
  }
}

//Fixed Generic type param for sprcific use case
class ProductStore extends Store<Product> {
  filterByCategory(category: string): Product[] {
    return this._objects.filter((obj) => obj.category == category);
  }
}

let store = new Store<Product>();
```

### `keyof` Operator

The `keyof` operator takes an object type and produces a string or numeric literal union of its keys:

- In the example code, the `Store` class has a method `find`
  - This takes in a property and value, performs an `array.find` on the store to check for matching values
- We've set the value to be `unknown` as find can be used for either price or name, both differing in types
- If we set a fixed type annotation for the propery param, the interpreter will think we're trying to target an index signature
- Instead, the `keyof` operator can be used as an annotator
  - This means that param will be one of the properties of that Type
  - In this case since `T` is `Product`, `keyof T` will return `name` or `price`
- Now when trying to check for a non-existing property, an error will be shown

```ts
class Product{
  name:string,
  price:number
}

class Store<T>{
  protected _objects: T[]= []

  add(obj: T): void{
    this._objects.push(obj)
  }
  find(property: keyof T ,value: unknown): T|undefined{
    return this._objects.find(obj=> obj[property]===value)
  }
}

let store= new Store<Product>()

store.add({name:'a',price: 5})

store.find('name','a')
store.find('price',5)

```

### Type Mapping

Sometimes we need to base a type on another type. This is called `type mapping`:

- Type mapping utilises two tools
  - The `keyof` property, to get a union of all types
  - Index signatures to assign a type to the value of the property
- Firstly the `in` keyword us used to iterate over all the properties in the Product class
- Then for each iteration, we are assigning the type of the property to be the type of value for that iteration
- By doing this we can now create readonly values of type Product

- We can further extend this, by making it a Generic type

```ts
class Product {
  name: string;
  price: number;
}

//Readonly Product
type ReadOnlyProduct = {
  readonly [Property in keyof Product]: Product[Property];
};

let product: ReadOnlyProduct = { name: "bread", price: 2 }; //valid

//Generic Readonly type
type ReadOnly<T> = {
  readonly [Key in T]: T[Key];
};

let product: ReadOnly<Product> = { name: "bread", price: 2 }; //valid generic
```

## Section 6: Decorators

Decorators are attributes we apply to classes and their members which can change how they behave.

A Decorator is just a function that gets called by the JavaScript runtime/engine, will call the code and pass our class to it.
In this function we have a chance to modify our class:

- We can add new properties, methods or change the implementation of existing methods
- To use decorators the compiler option `experimentalDecorators` should be enabled

```ts
@Component
class ProfileComponent {}
```

### Class Decorators

As previously mentioned, a decorator is simply a function that gets executed by the JavaScript runtime.

- Depending on where we call this Decorator, the number and type of parameters varies.
- Since we are calling it on a class, the only parameter we have is the constructor function (The constructor of the class).
- We can now add properties and methods to the constructors prototype, so that every class created will also contain these methods.

- We can also do this through inheritance, by having the class inherit the properties/methiods from a parent class

```ts
function Component(constructor: Function) {
  //This function will always run when the decorator is called even if no instances are created
  constructor.prototype.uniqueId = Date.now();
}

@Component
class ProfileComponent {}
```

### Parameterized Decorators

Sometimes we need to pass arguments to our decorators.

- To do this, we wrap our decorator in a function called a decorator factory, that returns an anonymous function
- Inside the decorator factory, we pass the arguments to the returned function expression
- The returned function will be called by the decorator at runtime

- We can take this a step further and pass Objects/types as arguments

```ts
type ComponentOptions = {
  selector: string;
};

// Decorator Factory
function Component(options: ComponentOptions) {
  return (constructor: Function) => {
    constructor.prototype.uniqueId = Date.now();
    constructor.prototype.options = options;
}

@Component({selector: '#profile'})
class ProfileComponent {}
```

### Decorator Composition

It is also possible to apply multiple decorators to one class:

- As seen in the example below, we create another decorator function 'Pipe'
- Despite being applied below the first decorator, it will be applied first.
- This is because constructors follow the `f(g(x))` Function composition concept in Maths.

```ts
function Pipe(constructor: Function) {
  constructor.prototype.pipe = true;
}

@Component({ selector: "#profile" })
@Pipe
class ProfileComponent {}
```

### Method Decorators

We can also enhance our methods using decorators:

- First we create a decorator function which takes in 3 parameters
  - target, which has to be set to type of `any`
  - The name of the targetMethod
  - The descritor object of the target method, which will have a type of `PropertyDescriptor`
    - Using `descriptor.value` we can access the passed method and even overwrite it

```ts
function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {
  //Use type assertion to tell compiler it is a function
  const original = descriptor.value as Function;

  //Rest operator to allow for an arbitrary number of arguments, and spread to pass them when called
  descriptor.value = function (...args: any) {
    console.log("Before");
    original.call(this, ...args);
    console.log("After");
  };
}

class Person {
  @Log
  say(message: string) {
    console.log(message);
  }
}
```

### Property Decorators

We can also use decorators to enhance class properties:

- In the example we start by creating a User class with a password property
- Since property decorators can only be called on actual properties and not within the constructor function

  - Hence why we are not using parameter properties

- In the example, our decorator ensures our properties (password in this case) fit the passed length requirements
- We create a Decorator factory which passes the length to our actual decorator
- The decorator also takes the target and propertyName

- In our decorator, we create a `PropertyDescriptor` for our target property
- Within this we define the getters and setters, which can be called on that property
- Finally we assign the descriptor to our target property

```ts
function MinLength(length: number) {
  return (target: any, propertyName: string) => {
    let value: string;
    const descriptor: PropertyDescriptor = {
      get(){
        return value
      }
      set(newValue: string) {
        if (newValue.length < length) {
          throw new Error(
            `${propertyName} should at least be ${length} characters long`
          );
        }
        value = newValue;
      },
    };
    Object.defineProperty(target,propertyName, descriptor)
  };
}

class User {
  @MinLength(8)
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}
```

## Section 7: Integrating with JavaScript

It will not always be possible to code purely in TypeScript. This could be due to numerous reasons for example working on a prevoious JS project which has not yet had TypeScript integrated or using a library not configured for TypeScript.

- In order for our TS compiler to recognize JS imports we need to enable the `allowJS` setting
- Also we need to change the `module` setting to `CommonJS` to solve module issues

JavaScript File:

```js
export function calculateTax(income) {
  return income * 0.3;
}
```

TypeScript File:

```ts
import { calculateTax } from "./tax";
```

### Type Checking JS Code

The next problem is type checking. Doing the above will allow for us to use JS code, however it will not be typechecked, leading to possible errors upon compilation.

One fix is enabling `checkJs` in our config file. This will enable basic type checking.

In cases where we don't want our JS code being type checked, we can add the following comment on top of our files:

```js
// @ts-nocheck
export function calculateTax(income) {
  return income * 0.3;
}
```

### Describing Types Using JSDoc

JSDoc is a special type of comment we can add to our JS files, which we can use to describe type information as so:

- We can also add comments explaining our code, so that others can see through intellisense.

```js
/**
 * @param {number} income - net salary after expenses
 * @returns {number}
 * */
export function calculateTax(income) {
  return income * 0.3;
}
```

### TS Declaration files

Another way of providing type information is through declaration files. These are files depicted through the `d.ts` extension

Declaration files should have the same name as their corresponding JS file.

When using declaration files, all functions should be described within them, otherwise they will not be accessible to our TS files.

```ts
export declare function calculateTax(income: number): number;
```

### Using Definitely Typed Declaration Files for third part libraries

As previously mentioned, certain libraries do not come with built in TS support.

An example of this is the utility library `lodash`.

Despite this, there is a library called definitely typed, which contains type declarations for most popular libraries.

Whe can install specific packages as so `npm install @types/lodash`

## Section 8: React with TypeScript

We can create a React Application configured with TypeScript support using the following syntax:

`npx create-react-app <app-name> --template typescript`

This will set up our boilerplate code, only our jsx files are now replaced with `tsx`

### Creating a Component

In React, all functional components come with a default parameter called props, which holds all the properties passed to it.
With TypeScript, just passing props will give us an error, as there is no specificity of it's type/shape.

We can fix this by creating an interface and annotating our props with it:

- In our example code, the reminder list is a component to render a list of reminders

  - Therefore it takes in an array of reminders as its props

- The reminders interface, however is something that will be referred to throughout the app, therefore it is best to create a separate file for it
  - It is convention to store all our reusbale types/interfaces in a folder called models/types/entities/interfaces

Component:

```ts
//Standard naming convention
interface ReminderListProps {
  //will contain an array of Reminder objects
  items: Reminder[];
}
function ReminderList(props: ReminderListProps) {
  return <div></div>;
}
```

Reusable Interface:

```ts
interface Reminder {
  id: number;
  title: string;
}
```

### Using Generic Functional Components

An issue with our previous implementation is that we're restricting our props to contain the properties we pass in our interfaces.
In doing so we have ignored the `children` property that comes with every react component.
A fix for this could be to add the `children` property to all out prop interfaces, however this can be cumbersome and there is a better solution.

- A functional component can be turned into a Generic Function
- In doing so it will be a component that contains all the base React properties

  - However it will also be restricted to the interfaces we pass to it

- Firstly, we convert our components to function expressions and assign an annotation of `React.FC`
  - We now have access to the `children` prop
- Next we can make our FC Generic by passing a generic type to it, allowing us to shape our props

```ts
//Import Todo from models

interface TodosProps {
  items: Todo[];
}

const Todos: React.FC<TodosProps> = (props) => {
  return <div>{props.items.map(...)}</div>;
};
```

### Form Submission

In React, forms are handled through the `onSubmit` prop, wherein the event object is passed as an argument to our submit handler.
With TypeScript, we now have to specify the type of the event object as `React.FormEvent` in order to access its properties.

```ts
function submitHandler(e: React.FormEvent) {
  e.preventDefault();
}
```

### Using the useState Hook

As we are using a TypeScript template, our project comes built in with tools to allow for type checking.

- The `useState` hook is now Generic and can have types passed to it
- In our example, we've again used the reminder type but now as an array
- We do however, have to give an initial state of an empty array otherwise the compiler will raise a type issue
  - This is because an empty useState will return `undefined`

```ts
function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
}
```

### Working with Refs

The 'useRef' hook is used to create a reference that can be attatched to a pure HTML element to read its values.
The above implementation would work in normal JS, however with TypeScript, extra steps must be taken, as there are different types of HTML elements a ref can be attatched to:

- We first apply a genenric type to our `useRef` specifying the type of element it will be attached to
  - In this case it is the `HTMLInputElement` type.
  - All DOM elements have built in types, which we can use to refer to them
- We must also initialise it with a value of `null` otherwise the TS compiler will think the ref is initialised to another element

```ts
const inputTextRef = useRef<HTMLInputElement>(null);
```

### React Context with TypeScript

React context, allows for us to set up and utilize component wide state
Typically, context will be defined in a store reporsitory along with a provider, which wraps our app component

- We first create our context, and provide a generic type for our `createContext` function
  - Within this function we create our initial object
  - The Generic will check if this object matches the provided interface
- We can then create the Context Provider, which will handle all the state and logic
- In the provider, we can provide the state and handlers as the value in the form of an object to be used elsewhere

```ts
interface TodosCtx{
  items: Todo[];
  addTodo:(text:string)=>void;
  removeTodo:(id:string)=>void;
}

let TodosContext = React.createContext<TodosCtx>({
  items: [],
  addTodo: () => {},
  removeTodo(id:string)=>{}
});

const TodosContextProvider: React.FC=(props)=>{
  //Will contain state for Todos, and matching handlers too

  let contextValue:TodosCtx={
    items:todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  }
  return(
    //Wrapper
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  )

}
```
