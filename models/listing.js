const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    
    },
    description:String,
    price:{
       type:Number,
       required:true},
    location:String,
    country:String,
    // image:{
    //     type:String,
    //     default:"for developer",

    //     set:(v)=>v===""?"pasted url":"v"
    // }
    image: {
    filename: {
        type: String,
        default: "listingimage"
    },
    url: {
        type: String,
        default: "https://images.unsplash.com/..."
    }
}

})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

