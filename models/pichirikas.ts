import mongoose, { Schema, Document } from "mongoose";

export interface ICommandSchema extends Document {
    id: string;
    name: string;
    table: string;
    image: string;
    price: number;
}

// Definir el esquema para los elementos del menú
const CommandSchema = new Schema(
    {
        id: { type: String, required: true, unique: true, trim: true },
        name: { type: String, required: true, trim: true },
        departament: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        image: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Crear el modelo utilizando el esquema
const Command =
    mongoose.models.Command || mongoose.model("Command", CommandSchema);

export default Command;
