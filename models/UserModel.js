import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "Last Name",
  },
  location: {
    type: String,
    default: "My City",
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  avatar: String,
  avatarPublicId: String,
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
