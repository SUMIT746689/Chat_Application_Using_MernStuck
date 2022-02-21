//External module
const express = require('express');
const mongoose = require('mongoose');
const { errorHandler,defaultErrorHandler } = require('./middleware/errorHandler');
const {inboxRouter} = require('./router/inboxRouter');
const {loginRouter} = require('./router/loginRouter');
const {usersRouter} = require('./router/usersRouter');

//Internal module
const app = express();
require('dotenv').config();

//database connection
mongoose.connect(process.env.MONGOOSE,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=>console.log("DataBase connection Successfull"))
.catch((err)=>console.log(err));

//request Parser
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//set view engine
app.set("view engine","ejs");

//set static folder
app.use(express.static('public',{
    extensions: ['htm', 'html'],
    index : false
}));

app.use('/',loginRouter);
app.use('/users',usersRouter);
app.use('/inbox',inboxRouter);


app.use(errorHandler);

//default error handler
app.use(defaultErrorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`Listening at ${process.env.PORT} ...`);
})

