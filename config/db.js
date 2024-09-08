const mongoose=require("mongoose");

module.exports.connectDB=async()=>{
    await mongoose.connect(process.env.DATABASE)
    .then(()=>{
        console.log("DB Connected")
    })
    .catch((e)=>{
        console.log(e)
    })
}
