import mongoose from "mongoose";

const connect = async () => {
  //   pass: F3fyyBLKxGNOwJKY;
  //   user: aamuktadir;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection successful");
  } catch (error) {
    throw new Error("Error in connecting to mongobd");
  }
};

export default connect;
