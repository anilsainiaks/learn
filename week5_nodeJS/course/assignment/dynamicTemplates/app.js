const bodyParser = require('body-parser');
const express=require('express');
const path=require('path');
const rootPath=require('./util/path');

const adminData=require('./routes/addUsers');
const users=require('./routes/users');

const app=express();

//EJS
app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(rootPath,'public')));

app.use('/admin',adminData.routes);
app.use('/',users);

app.use((req,res,next)=>{
    res.status(404).render('404',{
        pageTitle:'404'
    });
});

app.listen(3000);