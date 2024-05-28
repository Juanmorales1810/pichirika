import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IPetSchema extends Document {
    _id?: ObjectId | string | undefined;
    name: string;
    department: string;
    street1: string;
    street2: string;
    description: string;
    isHomeless: boolean;
    image: string;
}

// Definir el esquema para los elementos del menú
const PetSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        department: { type: String, required: true, trim: true },
        street1: { type: String, required: true, trim: true },
        street2: { type: String, required: false, trim: true },
        description: { type: String, required: false, trim: true },
        isHomeless: { type: String, required: true },
        image: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Crear el modelo utilizando el esquema
const Pet = mongoose.models.Pet || mongoose.model("Pet", PetSchema);

export default Pet;
