class BankAccout{
    constructor(account,name,balance){
        this.account=account;
        this.name=name;
        this.balance=balance
    }

    deposit(amount){
        this.balance+=amount
    }

    withdraw(amount){
        if(this.balance<amount){
            throw "not enough balance"
        }else{
            this.balance-=amount
        }
    }

    transfer(amount,toAccount){
        if(this.balance<amount){
            throw "not enough balance"
        }else{
            this.balance-=amount;
            toAccount.deposit(amount);
        }
    }

    details(){
        return {name:this.name,balance:this.balance}
    }
}

const a=new BankAccout(123,"anil",100)
const b=new BankAccout(124,"aman",300)

a.deposit(100)
console.log(a.details())

b.withdraw(50)
console.log(b.details())

a.transfer(200,b)
console.log(a.details())
console.log(b.details())

a.withdraw(100)