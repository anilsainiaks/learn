const express=require('express');
const adminRoutes=require('./routes/admin');
const shopRoute=require('./routes/shop');
const path=require('path');
const rootPath=require('./util/path');
const errorController=require('./controllers/error');
const bodyParser=require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
const mongodb = require('mongodb');

const app=express();

// EJS
app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(rootPath,'public')));

app.use((req,res,next)=>{
    User.findById(new mongodb.ObjectId('65f43fda21ef793fb41baba5'))
    .then(user=>{
        req.user=new User(user.name,user.email,user.cart,user._id);
        next();
    })
    .catch(err=>{
        console.log(err);
    })
})

app.use('/admin',adminRoutes);
app.use(shopRoute);


app.use(errorController.get404);

mongoConnect(()=>{
    app.listen(3002);
})