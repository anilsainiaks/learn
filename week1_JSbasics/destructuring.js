//swapping variables
let temp1=5,temp2=7;
[temp1,temp2]=[temp2,temp1]
console.log(temp1,temp2)


//array
const a=[undefined,1,2,3,4,5]

// const [x,y]=a;
// const [,x,y]=a;
// const [x,y,...rest]=a;
// const [x,,y,...rest]=a;
// const [x,y,...{pop,push}]=a
// const [x=6,y]=a;
// const [x,y,...{length}]=a


console.log(x,y,length);


//object
const car={
    name:"g-wagon",
    color:{
        shade:"light"
    },
    company:"mercedez"
}

// const {name,color}=car;
// const {name,color:{shade}}=car;
const {name,color:{shade:aa}}=car

console.log(name,aa)



//array of objects
const arr=[
    {name:"anil",age:22},
    {name:"aman",age:21},
    {name:"ronak",age:29},
    {name:"akash",age:25},  
]

for(const {name} of arr){
    console.log(name)
}


