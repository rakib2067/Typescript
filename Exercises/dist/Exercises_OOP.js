"use strict";
class Logger {
    constructor(fileName) {
        this.fileName = fileName;
    }
    log(message) {
        console.log(message);
    }
}
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fulName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
class Employee extends Person {
    constructor(salary, firstName, lastName) {
        super(firstName, lastName);
        this.salary = salary;
    }
}
//# sourceMappingURL=Exercises_OOP.js.map