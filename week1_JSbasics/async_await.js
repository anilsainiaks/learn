const delay=(time)=>{
    return new Promise((resolve)=>setTimeout(resolve,time))
}

const getFruit=async(name)=>{
    const fruits={
        pineapple:"🍍",
        apple:"🍎️",
        strawberry:"🍓️"
    }
    await delay(1000);
    return Promise.resolve(fruits[name]);
}

const newFun=async()=>{
    const data1=getFruit("apple");
    const data2=getFruit("pineapple");

    const data=await Promise.all([data1,data2])
    .then(message=>console.log(message))
    .catch(message=>console.log(message))

    return data;
}
newFun();