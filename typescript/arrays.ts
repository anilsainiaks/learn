const superHero:string[]=[]
superHero.push("spiderman")

const arr:number[]=[]
arr.push(5,7,8)

const arr1:boolean[]=[]
arr1.push(true)

type User={
    name:string,
    isActive:boolean,
    creditCard?:number
}
const arr2:User[]=[]
arr2.push({name:"anil",isActive:true})
arr2.push({name:"anil",isActive:true,creditCard:1435})
arr2.push({name:"anil",isActive:true})
console.log(arr2)
