import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  species: { type: String },
  breed: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
