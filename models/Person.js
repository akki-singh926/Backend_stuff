const mongoose=require('mongoose');
//define the person schema
const bcrypt= require('bcrypt');

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true

    },
    mobile:{
        type:String,
        reuired:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    }
    ,
    address:{
        type:String
    },
    salary:{
        type:Number
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
personSchema.pre('save',async function(next){
    const person=this;
    //hash the password only when the record is new
    if(!person.isModified('password'))return next();
    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10);

        const hashedPassword=await bcrypt.hash(person.password,salt);
        person.password=hashedPassword;


next();
    }
    catch(err){
        return next(err);

    }
})
personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch

    }
    catch(err){
        throw err;

    }
}
const Person=mongoose.model('Person',personSchema);
module.exports=Person;

