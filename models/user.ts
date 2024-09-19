import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser {
    _id?: ObjectId | string | undefined;
    correo: string;
    password: string;
    name: string;
    lastName: string;
    phone: string;
    itsRefuge: boolean;
    refugeteTelephone?: string;
    refugeteName?: string;
}

export interface IUserSchema extends Document {
    _id?: ObjectId | string | undefined;
    correo: string;
    password: string;
    name: string;
    lastName: string;
    phone: string;
    itsRefuge: boolean;
    refugeteTelephone?: string;
    refugeteName?: string;
    createdAt?: string;
    updatedAt?: string;
}

const UserSchema: Schema = new Schema(
    {
        correo: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: String, required: true },
        itsRefuge: { type: Boolean, required: true },
        refugeteTelephone: { type: String },
        refugeteName: { type: String },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
