interface User{
    readonly dbId:number,
    email:string,
    userId:number,
    googleId?:string,
    startTrial():string,
    getCoupon(coupanName:string,discount:number):number
}

//reopening of interface
interface User{
    githubToken?:string
}

//extends
interface Admin extends User{
    role:"admin" | "ta" | "learner"
}

const anil:Admin={
    dbId:2341,
    email:"anil@gmail.com",
    userId:4564,
    startTrial() {
        return 'trial started';
    },
    getCoupon:(name:"zomato",off:15)=>{
        return off
    },
    role:"admin",
}

export {}