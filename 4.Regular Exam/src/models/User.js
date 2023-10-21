const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
   username: {
      type: String,
      required: [true, 'Username is required'],
      minLength: [3, 'Username must be at least 3 characters long']
   },
   email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
         validator: async function (email) {
            const user = await this.constructor.findOne({ email });
            if (user) {
               if (this.id === user.id) {
                  return true;
               }
               return false;
            }
            return true;
         },
         message: () => 'The specified email address is already in use.',
      },
      minLength: [10, 'Email must be at least 10 characters long']
   },
   password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [4, 'Password must be at least 4 characters long']
   },
});

userSchema.pre('save', async function () {
   const hash = await bcrypt.hash(this.password, 10);
   this.password = hash;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
