import mongoose from "mongoose";

const { Schema } = mongoose;

const clubsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    manager: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.clubs || mongoose.model("clubs", clubsSchema);
