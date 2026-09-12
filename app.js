const express=require("express");
const app=express();
const mongoose=require("mongoose");



const Listing=require("./models/listing.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');

}

main().then(()=>{
    console.log("database connected")
}).catch(err=>{
    console.log(err);
})

app.listen(8080,()=>{
    console.log("port is listening")
});

app.get("/testListing",async (req,res)=>{
    let sampleListing=new Listing({
        title:"My home",
        price:1200,
        description:"Sweet Home vibes"

    })
    await sampleListing.save();



    res.send("saved");
})

app.get("/",(req,res)=>{
    res.send("this is home route");
})