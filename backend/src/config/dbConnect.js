import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    return connection;
  } catch (err) {
    throw err;
  }
}

const dbConnect = () => {
  main()
    .then((mongodbConnection) => {
      console.log(
        `Connected to MongoDB Database: ${mongodbConnection.connection.host}`,
      );
    })
    .catch((err) => {
      console.log(`Failed to connect MongoDB Database: ${err}`);
    });
};

export default dbConnect;
