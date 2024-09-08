const orderModel=require("../models/orderModel");
const userModel=require("../models/userModel")
const Stripe =require("stripe");

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order for frontend

module.exports.placeOrder=async(req,res)=>{
  
     const frontend_url=process.env.BASE_URL

    try{
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:Number(req.body.amount),
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_item=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    
                    name:item.name,
                },
                unit_amount:item.price*100*80,
            },
            quantity:item.quantity
        }))

        line_item.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Chargers"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        // const session=await stripe.checkout.sessions.create({
        //     line_item:line_item,
        //     mode:'payment',
        //     success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        // })
        const url=`${frontend_url}/verify?success=true&orderId=${newOrder._id}`
        res.json({success:true,session_url:url})
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:"Error"})
    }
}

module.exports.verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body;
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not paid"})
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


module.exports.userOrder=async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


//List of all orders for admin panel

module.exports.listOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({})
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//for updating order status

module.exports.updateStatus=async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status updated"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}