//1. JavaScript program to test whether the first character of a string is uppercase or not.

let text="my name is anil";
let regexExp=/\b[A-Z]/;

// console.log(regexExp.test(text)) 

//2. JavaScript program to search a date within a string.
text="Today date is 32/02/2024";
regexExp=/\d{1,2}\/\d{1,2}\/\d{4}/gi;

console.log(text.match(regexExp))

//3.pattern that matches e-mail addresses.
text="adf@"
regexExp=/^[A-Za-z0-9]+$/g
console.log(regexExp.test(text))
