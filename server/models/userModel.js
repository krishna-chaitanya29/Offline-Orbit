// server/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  image: {
    type: String, // Local upload path (e.g. /uploads/image-123.png) or empty for initials
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensure unique emails
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
