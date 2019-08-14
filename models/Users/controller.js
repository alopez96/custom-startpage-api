const User = require('./model'); 
const bcrypt = require('bcrypt');

const saltRound = 12;

//register a new user to mongoDB
exports.createUser = (req, res) => {
  // Destructuring the req.body
  const { name, email, password, joined } = req.body;
  if (name && email && password) {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //if the user already exists, reject duplicate account
        return res.status(400).json({ 'Error': 'User already exists' });
      } else {
        //create a new User
        let newUser = new User({
          name: name,
          email: email,
          password: password,
          joined: joined
        });

        // Hashes the user's password
        bcrypt.hash(password, saltRound, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          // Push new user onto db if successful, else display error
          newUser.save()
          .then(user => res.json(user))
          .catch( err => { res.status(400).json('error getting user')})
        });
      }
    });
  } else {
    return res.status(400).json({ 'Error': 'Missing fields' });
  }
};

//login
exports.login = (req, res) => {
  const { email, password } = req.body;
  //find user for login
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({ 'Error': 'User does not exist' });
    } else {
      //validate username and password
      bcrypt.compare(password, user.password).then(same => {
        //email and password are correct, send success token to server
        if (same) {
            res.json({ success: true, user });
        } else {
          return res.status(400).json({ 'Error': 'Password is incorrect' });
        }
      }).catch((err) => console.log(err));
    }
  });
}

//login
exports.getUser = (req, res) => {
  const { id } = req.params;
  
  User.findById({_id: id}).then((profile) => {
    if(profile){
      return res.status(200).json(profile)
    }
    else{
      return res.status(400).json('error')
    }
  })
}