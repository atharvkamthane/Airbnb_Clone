const express=require("express");
const router=express.Router();


//Index Route

router.get("/",wrapAsync(async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index",{allListings});
}));
//New Route

router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show Route
 
router.get("/:id",wrapAsync(
    async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}))

//Create Route

router.post("/",validateListing,wrapAsync(async (req,res)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400,"send valid data for listing");

    // }

        // let listing=req.body.listing;
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    // console.log(listing);
    res.redirect("/")

    })
    
);

//Edit route

router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

}));

//Update route

router.put("/:id",validateListing,wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing");

    }
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`)
}));


//Delete Route

router.delete("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings")
}))


module.exports=router;