const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
// const {listingSchema,reviewSchema}=require("./Schema.js");
// const Review=require("./models/review.js");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js")
const Listing=require("./models/listing.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');

}
 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"public")))
async function startServer() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
        console.log("database connected");

        app.listen(8080, () => {
            console.log("server is listening on port 8080");
        });
    } catch (error) {
        console.error("database connection failed:", error.message);
        process.exit(1);
    }
}

startServer();


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

app.get("/",(req,res)=>{
    res.send("this is home route");
})

app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="somethiing went wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
   
})


