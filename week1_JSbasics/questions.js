/* JavaScript program to display the current day and time in the following format.  
Sample Output : Today is : Tuesday.
Current time is : 10 PM : 30 : 38*/

const a=new Date();
switch(a.getDay()){
    case 0:
        console.log('Today is : Sunday')
        break;
    case 1:
        console.log('Today is : Monday')
        break;
    case 2:
        console.log('Today is : Tuesday')
        break;
    case 3:
        console.log('Today is : Wednesday')
        break;
    case 4:
        console.log('Today is : Thursday')
        break;
    case 5:
        console.log('Today is : Friday')
        break;
    case 6:
        console.log('Today is : Saturday')
        break;
}

const b=a.getHours()
if(b>=12){
    console.log(`Current Time is : ${b-12}PM:${a.getMinutes()}:${a.getSeconds()}`);
}else{
    console.log(`Current Time is : ${b}AM:${a.getMinutes()}:${a.getSeconds()}`);
}

/* JavaScript program to get the current date.
Expected Output :
mm-dd-yyyy, mm/dd/yyyy or dd-mm-yyyy, dd/mm/yyyy */

console.log(`${a.getDate()}-${a.getMonth()+1}-${a.getFullYear()}`)

/*JavaScript program to rotate the string 'w3resource' in the right direction. This is done by periodically removing one letter from the string end and attaching it to the front*/

let text='w3resource';
console.log(text.slice(text.length-1,text.length)+text.slice(0,text.length-1))

//JavaScript program to find out if 1st January will be a Sunday between 2014 and 2050
for(let i=2014;i<=2050;i++){
    let dd=new Date(String(i));
    if(dd.getDay()==0){
        console.log(i);
    }
}
