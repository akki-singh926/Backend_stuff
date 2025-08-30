require('dotenv').config();
const port=process.env.PORT||3000;
const express=require('express');
const app = express()
const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.get('/login',(req,res)=>{res.send("welcome to my first server");})

const personRoutes=require('./Routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes=require('./Routes/menuRoutes');
app.use('/menu',menuRoutes);
const PORT=process.env.PORT||3000;

app.listen(port)
