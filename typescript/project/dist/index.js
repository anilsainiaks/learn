"use strict";
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this._courseCount = 1;
    }
    deleteToken() {
        console.log("token deleted");
    }
    get courseCount() {
        return this._courseCount;
    }
    set courseCount(courseNum) {
        if (courseNum <= 1) {
            throw new Error("course count should be more than 1");
        }
        this._courseCount = courseNum;
    }
}
const anil = new User("anil", "anil@gmail.com");
// console.log(anil.details())
// console.log(anil.city)
