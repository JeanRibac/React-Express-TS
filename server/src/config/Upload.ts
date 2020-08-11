import multer from 'multer';
import { storage } from './Cloudinary';

//init upload
export const upload = multer({ storage });
