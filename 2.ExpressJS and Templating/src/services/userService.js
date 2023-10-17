const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt.js');
const { SECRET } = require('../constants.js');

exports.register = async (userData) => {
   const user = await User.create(userData);
   return user;
};

exports.login = async (username, password) => {
   const user = await User.findOne({ username });

   if (!user) throw new Error('Invalid username or password');

   const isValid = await bcrypt.compare(password, user.password);
   if (!isValid) throw new Error('Invalid password');

   const payload = {
      _id: user._id,
      username: user.username,
   };

   const token = await jwt.sign(payload, SECRET, { expiresIn: '30d' });

   return token;
};
