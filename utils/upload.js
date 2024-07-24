import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb://${username}:${password}@ac-f2m0ruy-shard-00-00.rmvadp4.mongodb.net:27017,ac-f2m0ruy-shard-00-01.rmvadp4.mongodb.net:27017,ac-f2m0ruy-shard-00-02.rmvadp4.mongodb.net:27017/?ssl=true&replicaSet=atlas-oy4rcx-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-api`,
  file: (request, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.memeType) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
