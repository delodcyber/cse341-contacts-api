const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'First name is required']
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required']
    },
    email: {
      type: String, 
      required: [true, 'Email address is required'],    
      unique: true,     
      lowercase: true,     
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Email address is invalid']
      
    },
    favoriteColor: {
      type: String,
      trim: true,
      required: [true, 'Favorite color is required']
    },
    birthday: {
      type: String,
      trim: true,
      required: [true, 'Birthday is required']
    }
  },
  {
    collection: "contacts"
  }
);

module.exports = mongoose.model("Contact", contactSchema);