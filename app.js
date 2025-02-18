// if (process.env.Node_ENV != "production") {
//   require("dotenv").config();
// }

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// console.log(process.env.SECRET)
// console.log(process.env.NODE_ENV)
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const port = 8080;
// const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
// const {listingSchema ,reviewSchema}=require("./schema.js");
// const {reviewSchema}=require("./schema.js");
// const Review = require("./models/review.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const wrapAsync = require("./utils/wrapAsync.js");
const { env } = require("process");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const dbUrl = process.env.ATLASDB_URL;


async function main() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  await mongoose.connect(dbUrl); 
  console.log("dbconnection trying")
  console.log("Connected to MongoDB");
} 


// async function main() {
//   try {
//     // await mongoose.connect(dbUrl);
//     // await mongoose.connect(dbUrl, { connectTimeoutMS: 10000 })

//       await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
//     console.log("Connected to MongoDB");
//   } catch (err) {
//     console.log("Error connecting to MongoDB:", err);
//   }
// }
// main();


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 60 * 60,
});

// store.on("error", () => {
//   console.log("Error in MONgo SESSION STORE", error);
// });
store.on("error", (error) => {
  console.log("Error in MongoDB session store", error);
});


const sessionOptions = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// app.get("/", (req, res) => {
//   res.send("hello from the home page");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  // console.log(res.locals.success);
  // console.log(success);
  next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "jigmat dorjey",
//   });
//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// app.get("/signup",(req,res)=>{
//   console.log("hello from laskah");
//   res.send("hello");
// });

main()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.use((req, res, next) => {
  res.locals.msg = req.flash("success");
  next();
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(port, () => {
  console.log(`listening through port : ${port}`);
});
