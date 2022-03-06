//external depaendence 
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { defaultRoute, defaultErrorHandler } = require('./middleware/errorHandle/defaultErrorHandle');
const inbox = require('./routes/inbox');
const login = require('./routes/login');
const users = require('./routes/users');

//internal dependencies 
const app = express();
require('dotenv').config();

//mongoose connection 
mongoose.connect(process.env.mongoose_connection_link,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=>{ console.log("Database connection Successfully...") })
.catch((err)=>{console.log(err)});


//application data recieve types
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//application public read file select
const paths = path.join(__dirname,'public');
const option = {
    index :false
}
app.use(express.static(paths,option));

//application set view engine
app.set('view engine','ejs');

//application routers 
app.use('/',login);
app.use('/inbox',inbox);
app.use('/users',users);

//default error handler
app.use(defaultRoute);
app.use(defaultErrorHandler);

//app runnig port 
app.listen(process.env.PORT,()=>{
    console.log(`Running at ${process.env.PORT} ...`)
})
