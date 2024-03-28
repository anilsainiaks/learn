const express=require('express');
const adminRoutes=require('./routes/admin');
const shopRoute=require('./routes/shop');
const path=require('path');
const rootPath=require('./util/path');
const errorController=require('./controllers/error');
const bodyParser=require('body-parser');
const expressHbs=require('express-handlebars');
const db=require('./util/database');

const app=express();

// DATABASE
// db.execute('SELECT * FROM products')
// .then((result)=>{
//     console.log(result[0]);
// })
// .catch();

// EJS
app.set('view engine','ejs');
app.set('views','views');


// handlebars
// app.engine('hbs',expressHbs.engine({
//     extname:"hbs",
//     layoutsDir:'views/layouts',
//     defaultLayout:"main-layout"
// }));
// app.set('view engine','hbs');
// app.set('views','views/hbs');


// PUG
// app.set('view engine','pug');
// app.set('views','views/pug');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(rootPath,'public')));

app.use('/admin',adminRoutes);
app.use(shopRoute);


app.use(errorController.get404);

app.listen(3000);