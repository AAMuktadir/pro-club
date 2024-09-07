import mongoose from "mongoose";

const { Schema } = mongoose;

const playersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    contact: {
      type: String,
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true,
    },

    height: {
      type: String,
      required: true,
    },

    foot: {
      type: String,
      required: true,
    },

    clubID: {
      type: String,
      required: true,
    },

    clubName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Players ||
  mongoose.model("Players", playersSchema);
