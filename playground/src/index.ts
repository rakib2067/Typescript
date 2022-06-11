// Exercise 1
type User={
    name:string;
    age: number;
    occupation?: string;
}

let users: User[]=[{name:'John Smith',age:30,occupation:'Software engineer'}]

console.log(users[0])

// Exercise 2
type Bird={
    fly: ()=> void
}

type Fish={
    swim:()=> void
}

// Union Type
type Pet = Bird | Fish

let shark: Fish={
    swim:()=>console.log('swim')
}
let pigeon: Bird={
    fly:()=>console.log('fly')
}



// Intersection type
type Puffin = Bird & Fish

let puffin: Puffin={
    swim:()=> console.log('swim'),
    fly:()=>console.log('fly')
}

puffin.swim()
puffin.fly()

// Exercise 3
type Days="Monday"|"Tuesday"|"Wednesday"|"Thursday"|"Friday"|"Saturday"|"Sunday"

let day: Days= "Saturday"
console.log(`Today is ${day}`)

// Exercise 4
let user: User={name:'rakib',age:22,occupation:'Software Engineer'}


// Simplify:
// console.log(user && user.address?user.address.street: undefined);


// optional property access operator
// console.log(user?.address?.street);

console.log(user?.occupation)

// let x = foo !== null && foo !== undefined ?foo:bar();


// Nullish Coaelscing Operator
// let x = foo ?? foo.bar()