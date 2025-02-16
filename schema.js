// const Joi=require("joi");
// const review = require("./models/review");


// module.exports.listingSchema=Joi.object({
//     listing : Joi.object(
//         {
//             title : Joi.string().required(),
//             description : Joi.string().required(),
//             image : Joi.object(
//                 {
//                     filename : Joi.string().default("default-Image"),
//                     url : Joi.string().uri().default("https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"),
//                 }
//             ).optional(),
//             price : Joi.number().required().min(0),
//             location : Joi.string().required(),
//             country : Joi.string().required(),

//         }
//     ).required(),
// });

// module.exports.reviewSchema=Joi.object({
//     review : Joi.object({
//         rating : Joi.number().required().min(1).max(5),
//         comment : Joi.string().required(),
//     }).required()
// })


// schema.js
const Joi = require('joi');

const listingSchema = Joi.object({
  listing: Joi.object().keys({ // Define 'listing' as an object
    title: Joi.string().required(),
    description: Joi.string(),
    image: Joi.object().keys({  // Define 'image' within 'listing' as an object
      url: Joi.string().uri().allow(""), // Validate url, allow empty string
      filename: Joi.string(),
    }),
    price: Joi.number(),
    location: Joi.string().required(),
    country: Joi.string().required(),
  }).required(), // 'listing' object is required
});

const reviewSchema = Joi.object({
  review: Joi.object().keys({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required()
});

module.exports = { listingSchema, reviewSchema };