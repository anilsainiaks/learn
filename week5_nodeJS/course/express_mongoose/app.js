const express=require('express');
const adminRoutes=require('./routes/admin');
const shopRoute=require('./routes/shop');
const path=require('path');
const rootPath=require('./util/path');
const errorController=require('./controllers/error');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const dotenv = require('dotenv');
dotenv.config();

const app=express();

// EJS
app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(rootPath,'public')));

app.use((req,res,next)=>{
    User.findById('65f7ea348e2cc95856eb7a1c')
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>{
        console.log(err);
    })
})

app.use('/admin',adminRoutes);
app.use(shopRoute);


app.use(errorController.get404);

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('db connected');
    User.findOne()
    .then(user=>{
        if(!user){
            const user = new User({
                name:'Anil',
                email:'anil@ak.com',
                cart:{
                    items:[]
                }
            })
            user.save();
        }
    })
    
    app.listen(3001);
})
.catch(err=>{
    console.log(err);
})