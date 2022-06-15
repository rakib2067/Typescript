//Exercise 1:
class Logger{
    constructor(public fileName: string){

    }
    log(message :string){
        //IO implementation here 
    }
}

// Exercise 2:
class Person { 
    constructor(public firstName:string, public lastName:string) {}

    get fulName(){
        return `${this.firstName} ${this.lastName}`
    }
}

class Employee extends Person{
    constructor(public salary: number, firstName: string, lastName: string){
        super(firstName,lastName)
    }
}


interface Address{
    street:string;
    city:string;
    zipCode:number; 
}
interface Employee{
    name: string
    salary: number  
    address: Address;
}