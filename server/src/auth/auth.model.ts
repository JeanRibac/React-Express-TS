import { Model, model, Document, Schema} from "mongoose";

export const UserSchema = new Schema({
    // postings: [{type: Schema.Types.ObjectId, ref: "Posting"}],
    email: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    fullName:{
        type: String, required: false
    },
    phone:{
        type: String,
        required: false,
    },
    address:{
        type: String,
        required: false,
    },
    city:{
        type: String,
        required: false,
    },
    descriere:{
        type: String,
        required: false,
    },
    profilePicture:{
        public_id: String,
        secure_url: String
    },
    salt: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export interface UserInterface extends Document {
    id: string;
    email: string;
    password: string;
    salt: string;
}

export const User: Model<UserInterface> = model<UserInterface>("User", UserSchema)