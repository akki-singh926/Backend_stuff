const express=require('express');
const router=express.Router();
const menu=require('./../models/menu');

router.post('/',async(req,res)=>{
    try{
    const data=req.body;
    const menulist=new menu(data);
    const savedmenu=await menulist.save();
    console.log("menu saved");
    res.status(200).json({savedmenu});
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:"Internal server error"});
    }
  })
  router.get('/',async(req,res)=>{
    try{
      const data=await menu.find();
      console.log("data fetched");
      res.status(200).json({data});
  
    }catch(err){
      console.log(err);
      res.status(500).json({error:"internal server error"});
   }
  })
  router.get('/:tasteType',async(req,res)=>{

    try{
        const tasteType=req.params.tasteType;
        if(tasteType=='Spicy'||tasteType=='Sour'||tasteType=='Sweet'){
        
        const data=await menu.find({taste:tasteType});
        console.log("data  fetched succesfully");
        res.status(200).json({data});
        }
        else{
            res.status(404).json({error:"inavlid taste type"});
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
        const updatedMenudata=req.body;
        const response=await menu.findByIdAndUpdate(id,updatedMenudata,{
            new:true,
            runValidators:true
        });
        if(!response){
           return res.status(404).json({error:"invalid id"});
        }
        console.log("data of menu updated succesfully");
        res.status(200).json({response});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
  })
  router.delete('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const response=await menu.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({error:"invalid id"});
        }
        console.log("data of menu deleted succesfully");
        res.status(200).json({response});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
  })
  //comment added to check the next version

  module.exports=router;
  
