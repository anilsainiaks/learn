//use when we are not sure which type of data will come so we can take union of datatypes

let score:number|string=33;

score=44;
score="45"

type User={
    name:string;
    id:number
}

type Admin={
    userName:string,
    id:number
}

let user:User|Admin={name:"anil",id:134};

function getDBId(id:string|number){
    //direct string or number operations will not work on id as ts thinks this is a new datatype which is union of both string and number
    // id.toLowerCase()

    if(typeof id==="string"){
        //but now it is sure that is string 
        id.toLowerCase()
    }else{
        id+=2
    }
}

//array
const data:(number|string)[]=[]
data.push(1,2,"3")


//good example (in this seatallotment can only be given these values nothing else)
let seatAllotment : "aisle"|"middle"|"window"
seatAllotment="middle"




//tuples
let nuser:[number,string,boolean]=[5,"anil",true]



//enum
const enum seatChoice{
    AISLE="aisle", //can give any value to them
    MIDDLE=3,
    WINDOW
}

const seat=seatChoice.AISLE