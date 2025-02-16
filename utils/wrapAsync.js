const wrapAsync = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(next); // Calls the function and handles errors via next()
    };
  };


 module.exports = wrapAsync;
  