const a=[1,2,3,null,2,4,true,5,false,undefined]
const b=[1,2,6,4,true,undefined]
const c=[[1,2],[4,[5,NaN],true],undefined]
const d=[
    {
        name:"Anil",
        gender:"Male",
        salary:44,
        active:true,
        info:{
            company:"techuz"
        }
    },
    {
        name:"Aman",
        gender:"Male",
        salary:34,
        active:false,
        info:{
            company:"techuz"
        }
    },
    {
        name:"Rishika",
        gender:"Female",
        salary:49,
        active:true,
        info:{
            company:"mediaamp"
        }
    },
    {
        name:"Siddh",
        gender:"Male",
        salary:54,
        active:true,
        info:{
            company:"techuz"
        }
    },
    {
        name:"Muskan",
        gender:"Female",
        salary:78,
        active:false,
        info:{
            company:"techuz"
        }
    },
    {
        name:"Akash",
        gender:"Male",
        salary:46,
        active:true,
        info:{
            company:"TTN"
        }
    },
    {
        name:"Anil",
        gender:"Male",
        salary:41,
        active:false,
        info:{
            company:"AWS"
        }
    }
]
console.log('a : ',a)
console.log('b : ',b)
const _=require('lodash');
//chunk _.chunk(array, [size=1])

//compact _.compact(array)
nn=a.filter(x=>x)

//union
nn=[...new Set(a.concat(b))]

//intersection
nn=[...new Set(a.filter(x=>(b.includes(x))))]

//difference
nn=[...new Set(a.filter(x=>!b.includes(x)))]

//flatten deep
nn=c.flat(Infinity)

//countBy

//groupBy

//orderBy _.orderBy(users, ['user', 'age'], ['asc', 'desc'])

//map

//reduce

//group by female and male with their total salary

//fill _.fill(array, value, [start=0], [end=array.length])
// nn=_.fill(a,'*',1,4)


//sorted index (gives index where an element should be insterted to maintain the orderx)


//keyBy

//uniq

//includes
let intersection=a.filter(item=>(b.includes(item)))
console.log(intersection)

console.log(nn)
