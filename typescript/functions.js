"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//if we don't mention datatype by default it takes any and doesn't complain in the function
function addTwo(a, b) {
    return a + b;
}
console.log(addTwo(2, 3));
//gives one error at a time while calling a function
function signUp(name, email, isPaid) { }
signUp("anil", "ak@gmail.com", true);
//want to pass less things and give default values to parameters in function
var login = function (name, email, isPaid) {
    if (isPaid === void 0) { isPaid = false; }
};
login("h", "h@gmail.com");
