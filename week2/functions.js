const _=require('lodash')

//after  (function will only invoke after n number of callings)
const a=[1,2]
const done=_.after(a.length,function(){
    console.log("operation completed")
})
a.map((val)=>{
    console.log(val**2)
    done()
})