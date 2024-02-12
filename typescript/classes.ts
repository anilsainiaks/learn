// public can be accessed where in and out of the class
//private can only be accessed inside the class but outside the class
//protected can be accessed inside the class and in the child class after inheritance


class User{
    private _courseCount=1;
    protected a=1;
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

class subUser extends User{
    isFamily:boolean=true;
    changeValueA(){
        this.a=13;
    }
}

const anil=new User("anil","anil@gmail.com")
// console.log(anil.details())
// console.log(anil.city)
