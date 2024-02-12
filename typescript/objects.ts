const user={
    name:"anil",
    email:"anil@gmail.com",
    isActive:true,
    isPaid:false
}

// function createUser({name:string,isPaid:boolean}){}

// createUser({name:"anil",isPaid:false})
// createUser(user)

//return something particular 
function createCourse():{name:string,price:number}{
    return {name:"anil",price:12}
}


//better method to take object for functions
//type aliases are used when we want ot use the same type more than once and refer to it by a single name
type User={
    readonly _id:string,
    name:string,
    email:string,
    isActive:boolean,
    credCardDetails?:number
}

let myUser:User={
    _id:"an123",
    name:"anil",
    email:"a@gmail.com",
    isActive:false,
}
console.log(myUser);
// function createUser(user:User){}

// createUser({name:"anil",email:"ak@gmail.com",isActive:false})


//creating a new card detail
type cardNumber={
    cardnumber:string
}

type cardDate={
    carddate:string
}

type cardDetails=cardNumber & cardDate & {
    cardcvv:number
}


export {}