const User = require("../models/user.js");



// signUp page
module.exports.renderSignupForm= async (req, res) => {
    res.render("users/signup.ejs");
  }

// signUp post info
module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ username, email });
      let registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      // req.login
      req.login(registeredUser,(err)=>{
        if(err){
        return next(err);
        }
        req.flash("success", "Welcome to the WanderLust");
        res.redirect("/listings");
      });
  
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

// login page
module.exports.renderLoginForm = async (req, res) => {
    res.render("users/login.ejs");
  }

// slogin post info
module.exports.login = async (req, res) => {
    req.flash("success", "WELCOME TO WANDERLUST ! you are login ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }

// logout
module.exports.logout = async (req, res, next) => {
    // req.logout
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "you are logged out!");
      res .redirect("/listings");
    });
  }