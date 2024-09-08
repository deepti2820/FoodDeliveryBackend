const mongoose=require("mongoose");

module.exports.connectDB=async()=>{
    await mongoose.connect("mongodb+srv://deeptisinghal2003:MkzLzwx23u63azDV@cluster0.igbmd03.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("DB Connected")
    })
    .catch((e)=>{
        console.log(e)
    })
}