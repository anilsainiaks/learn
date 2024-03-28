const express=require('express');
const adminRoutes=require('./routes/admin');
const shopRoute=require('./routes/shop');
const path=require('path');
const rootPath=require('./util/path');
const errorController=require('./controllers/error');
const bodyParser=require('body-parser');
const User = require('./models/user');
const Cart = require('./models/cart');
const dotenv = require('dotenv');
const db = require('./util/database');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const Knex = require('knex');
const authRoutes = require('./routes/auth');
const csrf = require('csurf');
const flash =  require('connect-flash'); 
const multer = require('multer');

dotenv.config();
db();

const app=express();

const knex = Knex({
    client: 'mysql2',
    connection: {
      database: 'node',
      user:     'root',
      password: process.env.DATABASE_KEY
    }
})
const store = new KnexSessionStore({
    knex,
    tablename:'sessions'
})
const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./images');
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req,file,cb) =>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

// EJS
app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('imgUrl'));
app.use(express.static(path.join(rootPath,'public')));
app.use('/images',express.static(path.join(rootPath,'images')));
app.use(session({
    secret:'anilsaini',
    resave:false,
    saveUninitialized:false,
    store:store
}))

app.use(csrfProtection);
app.use(flash());

app.use((req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    User.query().findById(req.session.user.id)
    .then(user=>{
        if(!user){
            req.flash('/No user')
        }
        return user;
    })
    .then((user)=>{
        req.user=user;
        return user.$relatedQuery('cart');
    })
    .then(cart=>{
        if(!cart){
            return User.relatedQuery('cart').for(req.user.id).insert({});
        }
        return req.user.$relatedQuery('cart').first();
    })
    .then((result)=>{
        req.cart=result;
        next();
    })
    .catch(err=>{
        throw new Error(err);
    })
})

app.use((req,res,next)=>{
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use('/admin',adminRoutes);
app.use(shopRoute);
app.use(authRoutes);
app.use(errorController.get404);

app.listen(3000);