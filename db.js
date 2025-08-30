const mongoose=require('mongoose');

//define the mongodb connection url
const mongoURL='mongodb://localhost:27017/restaurants'
//mongoose.connection

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



