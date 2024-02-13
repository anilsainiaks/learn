const mypromise1=new Promise((resolve,reject)=>{
    let a=true;
    if(a){
        resolve("OK1")
    }else{
        reject("REJECT1")
    }
})

const mypromise2=new Promise((resolve,reject)=>{
    let a=false;
    if(a){
        resolve("OK2");
    }else{
        reject("REJECT2")
    }
});

const mypromise3=new Promise((resolve,reject)=>{
    let a=true
    if(a){
        resolve("OK3")
    }else{
        reject("REJECT3")
    }
})

// mypromise1.then((message)=>console.log(message)).catch(error=>console.log(error));

Promise.all([
    mypromise1,
    mypromise2,
    mypromise3
]).then((message)=>console.log(message)).catch(error=>console.log(error)).finally(console.log("anil"))