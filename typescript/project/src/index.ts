class User{
    private _courseCount=1;
    constructor(
        public name:string,
        public email:string,
        // private city:string
    ){}

    private deleteToken(){
        console.log("token deleted");
    }

    get courseCount():number{
        return this._courseCount;
    }

    set courseCount(courseNum:number){
        if(courseNum<=1){
            throw new Error("course count should be more than 1")
        }
        this._courseCount=courseNum;
    }
}

const anil=new User("anil","anil@gmail.com")
// console.log(anil.details())
// console.log(anil.city)
