//if we don't mention datatype by default it takes any and doesn't complain in the function
function addTwo(a:number,b:number){
    return a+b;
}

console.log(addTwo(2,3))

//gives one error at a time while calling a function
function signUp(name:string,email:string,isPaid:boolean){}

signUp("anil","ak@gmail.com",true)

//want to pass less things and give default values to parameters in function
const login=(name:string,email:string,isPaid:boolean=false)=>{}

login("h","h@gmail.com")

//can also mention return type in functions
const login1=(name:string,email:string,isPaid:boolean):boolean=>{
    return true;
}


export {}