const  express=require('express');
const router=express.Router();
const Person=require('./../models/Person');
router.post('/',async(req,res)=>{
    try{
      const data=req.body
      const newPerson=new Person(data);
    const savedperson= await newPerson.save()
    console.log('data saved',savedperson);
    res.status(200).json({savedperson});
    } 
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
    
    
  })
  router.get('/',async(req,res)=>{
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
  
  
  