import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, "Username is required"], 
    unique: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: [true, "Password is required"], 
    minlength: [6, "Password must be at least 6 characters long"]
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm Password is required try again"],
    validate: {
      // This only works on CREATE and SAVE
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match"
    }
  }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined; // remove confirmPassword from DB
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
