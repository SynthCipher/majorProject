const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// post review  route
module.exports.postReview = async (req, res) => {
  console.log(req.params.id);
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created");
  res.redirect(`/listings/${listing._id}`);
};

// delete review route
module.exports.destroyReview = async (req, res, next) => {
  let { id, reviewId } = req.params;
  // if (review.author._id.equal(res.._id)) {
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted");
  return res.redirect(`/listings/${id}`);
  // }
  // res.redirect(`/listings/${id}`);
};
