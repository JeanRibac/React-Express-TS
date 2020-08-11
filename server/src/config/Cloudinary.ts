import crypto from "crypto";
const cloudinaryStorage = require("multer-storage-cloudinary");
import cloudinary from "cloudinary";
import { CLOUD_NAME, API_KEY, API_SECRET } from "../config/Constants";

cloudinary.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});

const storage = cloudinaryStorage({
    cloudinary,
    folder: "Disertatie",
    // allowedFormats: ["jpeg", "jpg", "png", "gif", "mp4"],
    filename: (_req: Request, file: any, cb: Function) => {
        const buffer = crypto.randomBytes(16);
        const bufferToString = buffer.toString("hex");
        let uniqueFilename: string = file.originalname.replace(
        /\.jpeg|\.jpg|\.png|\.gif/gi,"");
        uniqueFilename += bufferToString;
        cb(undefined, uniqueFilename);
    },
});
export { cloudinary, storage };
