const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
    title: {
        type: String,
        required: true

    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    location: String,
    country: String,
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
        },

    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"

        }
    ]

})

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing){
        await Review.deleteMany({ _id: { $in: listing.reviews } })

    }
    

})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

