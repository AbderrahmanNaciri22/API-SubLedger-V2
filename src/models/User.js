import mongoose from "mongoose";

const walid_usersSchema = new mongoose.Schema({
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

const walid_users = mongoose.model("walid_users", walid_usersSchema);

export default walid_users;
