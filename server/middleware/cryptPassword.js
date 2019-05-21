const bcrypt = require('bcryptjs');

var cryptPassword = (req, res, next) => {
  var password = req.body.data.password.toString();
  bcrypt.genSalt(10, (err, salt) => {
    if(err){
      next();
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if(err){
        next();
      }
      req.body.data.password = hash;
      next();
    });
  });
}

module.exports = {
  cryptPassword
}
