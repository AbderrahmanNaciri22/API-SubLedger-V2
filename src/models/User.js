import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
  },
});

const users = mongoose.model("users", usersSchema);

export default users;
