const Listing = require("../models/listing");
const mbGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbGeocoding({ accessToken: mapToken});


// Index Route
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  // console.log("data recieved");
  res.render("listings/index.ejs", { allListings });
};

// new Route
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// show rouste
module.exports.showListing = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  // console.log(listing);
  if (!listing) {
    // throw new ExpressError(404, "Listing not found.");
    req.flash("error", "Listing you requested for does not exist !");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// create route
module.exports.createListing = async (req, res, next) => {


  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location ,
    limit: 1,
  })
    .send();
 
    // // console.log(response.body.features[0].geometry);
    // console.log(response.body.features[0].geometry);
    // res.send("----------------done--------------- ");


  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  
  newListing.geometry =response.body.features[0].geometry;
  // console.log(req.user);
  let saveListing = await newListing.save();
  console.log("----------------- \n ", saveListing);
  req.flash("success", "new listing added");
  res.redirect("/listings");
};

// Edit route
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  // console.log(listing);
  if (!listing) {
    // throw new ExpressError(404, "Listing not found.");
    req.flash("error", "Listing you requested for does not exist !");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250")
  res.render("listings/edit.ejs", { listing ,originalImageUrl });
};

// // update route
// module.exports.updateListing = async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   req.flash("success", "listing Updated");
//   res.redirect(`/listings/${id}`);
// };
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const updatedData = { ...req.body.listing };
  // If a new image is uploaded, update the image URL and filename
  if (req.file) {
    const url = req.file.path;
    const filename = req.file.filename;
    updatedData.image = { url, filename };
  }

  // Update the listing in the database
  await Listing.findByIdAndUpdate(id, updatedData);

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

// delete route
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
