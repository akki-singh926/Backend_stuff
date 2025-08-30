const mongoose=require('mongoose');
require('dotenv').config();
const password = encodeURIComponent(process.env.DB_PASS);

const mongoURL = `mongodb+srv://${process.env.DB_USER}:${password}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
//const mongoURL=process.env.LOCAL;

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true})


   const db=mongoose.connection;
   //event listener for database
   db.on("connected",()=>{
console.log('Connected to MONgo db server');

   }) ;
   //event listener for database
   db.on("error",(err)=>{
console.log('Mongo db connection error',err);

   }) ;
   //event listener for database
   db.on("disconnected",()=>{
console.log('DisConnected to Mongodb');

   }) ;
   //export the database connection

   module.exports=db;



