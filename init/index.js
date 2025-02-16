const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main(){
      await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
      console.log("Connected to MongoDB");

}
main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})


const initDb = async () =>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner : "67ac649c62cb4429162159b2"}))
    await Listing.insertMany(initData.data);
}
initDb();