const  express=require('express');
const router=express.Router();
const Person=require('./../models/Person');
const{jwtAuthMiddleware,generateToken}=require('./../jwt')
router.post('/signup',async(req,res)=>{
    try{
      const data=req.body
      const newPerson=new Person(data);
    const savedperson= await newPerson.save()
    const payload={
      id:savedperson.id,
      username:savedperson.username
    }

    const token=generateToken (payload);
    console.log("token is",token);

 
    res.status(200).json({savedperson:savedperson,token:token});
    } 
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
    
    
  })
  router.post('/login',async(req,res)=>{
    try{
      const{username,password}=req.body;
      const user=await Person.findOne({username:username});
      if(!user||!(await user.comparePassword(password))){
        return res.status(401).json({error:"invalid username or password"});

      }
      const payload={
        id:user.id,
        username:user.username
      }
      const token =generateToken(payload);

      res.json({token});}
      catch(err){
       console.log(err);
       res.status(500).json({error:"internal servwer error"}) ;
      }
    
  })
  router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
      const userData=req.user;
      console.log("user data",userData);
      const userId=userData.id;
      const user=await Person.findById(userId);
      res.status(200).json({user});
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:"internal server error"});
    }
  })
  router.get('/',jwtAuthMiddleware,async(req,res)=>{
  try{
    const data= await Person.find();
    console.log("data fetched")
    res.status(200).json({data});
  } catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'})
  }
  })
  router.get('/:worktype',async(req,res)=>{
    try{
      const worktype=req.params.worktype;
      if(worktype=='chef'||worktype=='manager'||worktype=='waiter'){
        const data=await Person.find({work:worktype});
        console.log('data fetched succesfully');
        res.status(200).json({data});
      }
  
      else{
        res.status(404).json({error:'invalid work type'});
  
      }
  
    }
    catch(err){
  console.log(err);
      res.status(500).json({error:"internal server error"});
    }
  })
  router.put('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const updateddata=req.body;

        const response=await Person.findByIdAndUpdate(id,updateddata,{
            new:true,
            runValidators:true
        });
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log("data updated");
        res.status(200).json({response});


    }
    catch(error){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
  })
  router.delete('/:id',async(req,res)=>{
    try{
    const id=req.params.id;
    const response=await Person.findByIdAndDelete(id);
    if(!response){
        return res.status(404).json({error:'person not found'});
    }
    console.log("data deleted");
        res.status(200).json({message:"person deleted succesfully"});
    }
    catch(err){
        console.log(err);
      res.status(500).json({error:"internal server error"});

    }
  })
  module.exports=router;
  
  
  