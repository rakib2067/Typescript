//Convert the function below to a generic function:

function echo<T>(arg:T):T { return arg; }


// When compiling the following piece of code, we get an error saying ‘Property name does not exist on type T’. How can we solve this problem?

//applied a restricted type contraint
function printName<T extends {name:string}>(obj:T) {console.log(obj.name);}


/*
An Entity should have a unique identifier. The type of identifier, however, is dependent on the use case. 
In some cases, the ID might be a number, in other cases, it might be a string, GUID, etc. Represent the entity using a generic class. 
*/

class Entity<T>{
    constructor(public readonly id: T){

    }
}

// Given the following interface, what does keyof Account return?

interface Account { userId:number; username:string;}

// keyof Account = "userId"| "username"

