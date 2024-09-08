const foodModel=require("../models/foodModel.js");
const fs=require("fs");

//add food item

module.exports.addFood=async(req,res)=>{
    console.log(req.body)
    let image_filename=`${req.file.filename}`;

    const {name,category,desc,price}=req.body;
    try{
        await  foodModel.create({name,category,price:parseFloat(price),desc,image:image_filename});
        res.json({success:true,message:"Food Added"})
    }catch(error){
        console.log(e);
        res.json({success:false,message:"Error"})
    }
}

// all food list
module.exports.listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(e){
        console.log(e);
        res.json({success:false,message:"Error"})
    }
}

//remove food item

module.exports.removeFood=async(req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,"message":"Delete Food"})
    }catch(e){
        console.log(e);
        res.json({success:false,message:"Error"})
    }
}