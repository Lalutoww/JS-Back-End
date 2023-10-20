const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
   firstName: {
      type: String,
      required: [true, 'First Name is required'],
      minLength: [3, 'First name must be atleast 3 characters']
   },
   lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      minLength: [3, 'Last name must be atleast 3 characters']
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
      minLength: [10, 'Email must be atleast 10 characters']
   },
   password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [4, 'Password must be atleast 4 characters']
   },
});

userSchema.pre('save', async function () {
   const hash = await bcrypt.hash(this.password, 10);
   this.password = hash;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
