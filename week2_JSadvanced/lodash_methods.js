let _=require("lodash");

const a=[1,2,3,null,2,4,true,5]
console.log(a)
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
//chunk _.chunk(array, [size=1])
let nn=_.chunk(a,2)

//compact _.compact(array)
nn=_.compact(a)

//union
nn=_.union(a,b)

//intersection
nn=_.intersection(a,b)

//difference
nn=_.difference(a,b)

//flatten
nn=_.flatten(c)

//flatten deep
nn=_.flattenDeep(c)

//countBy
nn=_.countBy(d,'gender')

//groupBy
nn=_.groupBy(d,'gender')

//orderBy _.orderBy(users, ['user', 'age'], ['asc', 'desc'])
nn=_.orderBy(d,'salary')
nn=_.orderBy(d,'salary','desc')
console.log(nn)

nn=_.sortBy(d,'salary')

//map
nn=d.map(item=>item.name) //normal (only works on arrays)
nn=_.map(d,'name')      //lodash  (works on objects and arrays)

//reduce
nn=d.reduce((total,val)=>{return total+val.salary},0)
// nn=_.reduce(d,(prev,curr)=>prev+curr.salary,0)

//group by female and male with their total salary
nn=_.map((_.groupBy(d,'gender')),(grp)=>_.reduce(grp,(prev,curr)=>prev+curr.salary,0))

//fill _.fill(array, value, [start=0], [end=array.length])
// nn=_.fill(a,'*',1,4)

//pull (remove all occurences)
// _.pull(a,2)
// _.pullAll(a,[2,3])

//sorted index (gives index where an element should be insterted to maintain the orderx)
nn=_.sortedIndex(a,2)

//keyBy
let temp=_.keyBy(d,'name');
nn=temp["Anil"]

//uniq
nn=_.uniq(a)
nn=_.uniqBy(d,'name')

//includes
nn=_.includes(d[0],'Anil')   //checks for values in the object
nn='name' in d[0]           //checks for keys in the object



console.log(nn)