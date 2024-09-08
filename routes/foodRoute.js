const express=require("express");
const router=express.Router();
const {addFood, listFood, removeFood}=require("../controllers/foodControllers.js")
const multer=require("multer");


//Imagr storage engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload=multer({storage:storage});

router.post("/add",upload.single("image"),addFood)

router.get("/list",listFood);

router.post("/remove",removeFood)

module.exports=router