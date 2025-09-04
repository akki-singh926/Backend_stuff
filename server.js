require('dotenv').config();
const port=process.env.PORT||3000;
const express=require('express');
const app = express()
const db=require('./db');
const bodyParser=require('body-parser');

//authentication
const passport=require('./auth');

app.use(bodyParser.json());

const PORT=process.env.PORT||3000;
const logRequest=(req,res,next)=>{
  console.log(`${new Date().toLocaleString()} Request made to: ${req.originalUrl}`);
  next();
}
app.use(logRequest);

app.use(passport.initialize());
const localauthmiddleware=passport.authenticate('local',{session:false});

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.get('/login',function(req,res){res.send("welcome to my first server");})

const personRoutes=require('./Routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes=require('./Routes/menuRoutes');
app.use('/menu',menuRoutes);
//backend live url=https://backend-stuff-3.onrender.com

//middleware function


app.listen(PORT)
