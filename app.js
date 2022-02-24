//external Library
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const inbox = require('./router/inboxRouter');
const users = require('./router/userRouter');
const login = require('./router/loginRouter');
const cookieParser = require('cookie-parser');

//Internal library
const app = express();
require('dotenv').config({ override: true });
const { emptyFile, defaultErrorHandler } = require('./middleware/common/errorHandler');

//connect with database
mongoose.connect("mongodb://localhost:27017/people",{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=> console.log("database connection successful..."))
.catch((err)=>console.log(err));

//accept data type
app.use(express.json());
app.use(express.urlencoded({extended :true}));

//set view engine
app.set('view engine','ejs');

//add file access permission
app.use(express.static(`${__dirname}/public`,{
    extensions: ['htm', 'html'],
    index: false,
}));

//parse cookies
app.use(cookieParser())

//application router
//app.use('/',login);
//app.use('/inbox',inbox);
app.use('/users',users);

//Default error handler
app.use(emptyFile);
app.use(defaultErrorHandler);

//runnig port
app.listen(process.env.PORT,()=>{
    console.log('Listening...');
})
