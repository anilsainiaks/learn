const score:Array<number>=[];
const st:Array<string>=[]

function identityOne(val:number):number{
    return 4
}

function identityThree<Type>(val:Type):Type{
    return val
}

function identityFour<T>(val:T):T{
    return val
}

interface Bottle{
    brand:string,
    type:number
}

console.log(identityFour<Bottle>({brand:"cello",type:4}))

// generics in arrays
function identityFive<T>(val:T[]):T{
    return val[0]
}

const arr:number[]=[1,2,3]
console.log(identityFive(arr))

//generics in arrow functions
const getMoreSearchProducts=<T>(products:T[]):T=>{
    return products[0]
}

console.log(getMoreSearchProducts(arr))


interface Database{
    connection:number,
    username:string,
    password:string
}

function connectDatabase<T,U extends Database>(valOne:T,valTwo:U):object{
    return {
        valOne,
        valTwo
    }
}

console.log(connectDatabase("anil",{connection:5,username:"ak",password:"aks"}))



//new example
interface Quiz{
    name:string,
    type:string
}

interface Course{
    name:string,
    author:string,
    subject:string
}

class Sellable<T>{
    public cart:T[]=[];

    addToCart(product:T){
        this.cart.push(product)
    }
}