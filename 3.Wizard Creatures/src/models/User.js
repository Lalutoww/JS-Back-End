const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
   firstName: { type: String, required: [true, 'First Name is required'] },
   lastName: { type: String, required: [true, 'Last Name is required'] },
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
         message: msg => 'The specified email address is already in use.',
      }
   },
   password: { type: String, required: [true, 'Password is required'] },
});

userSchema.pre('save', async function () {
   const hash = await bcrypt.hash(this.password, 10);
   this.password = hash;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
