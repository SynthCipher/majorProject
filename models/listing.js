const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }, 
  // image: {
  //   filename: {
  //     type: String,
  //     default: "default-image", // Default filename
  //   },
  //   url: {
  //     type: String,
  //     default: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60", // Default image URL
  //   },
  // },
  image : {
    url : String,
    filename : String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews : [{
    type : Schema.Types.ObjectId,
    ref : "Review", 
  }],
  owner: {
    type : Schema.Types.ObjectId,
    ref : "User",
  },
  geometry :{
    type : {
      type : String,
      enum : ['Point'],
      requires : true,
    },
    coordinates : {
      type : [Number],
      requires : true,

    }
    
  },
  // category : {
  //   type : String,
  //   enum : ["mountain","artic","farm","pool"]
  // }
});

// Pre-save hook to set default image URL if not provided
// listingSchema.pre("save", function (next) {
//   if (!this.image || !this.image.url) {
//     this.image = this.image || {}; // Ensure image object exists
//     this.image.url = "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"; // Default image URL
//   }
//   next();
// });


// listingSchema.post("findOneAndDelete",async(listing)=>{
//   if(listing){
//     await Review.deleteMany({_id : {$in : Listing.reviews}});
//   }
// }
// )
listingSchema.post("findOneAndDelete", async (listing) => {
  console.log("------------------------------------");
  
  if (listing) {
    let res =await Review.deleteMany({ _id: { $in: listing.reviews } });
    console.log(res);
  }
});
// listingSchema.post("findOneAndDelete", async function (listing) {
//   if (listing) {
//     // Ensure that reviews are deleted when listing is deleted
//     await Review.deleteMany({ _id: { $in: listing.reviews } });
//   }
// });


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;



