const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
   username: String,
   password: String,
});

//arrow func wouldn't work because it doesn't have this
userSchema.pre('save', async function () {
   const hash = await bcrypt.hash(this.password, 10);
   this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
