import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IPetSchema extends Document {
    _id: ObjectId | string;
    name: string;
    department: string;
    street1: string;
    street2: string;
    age?: string;
    category: string;
    description: string;
    isHomeless: boolean;
    image: string;
    telephone: string;
    namecontact: string;
    expiresAt?: Date;
}

// Definir el esquema para los elementos del menú
const PetSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        department: { type: String, required: true, trim: true },
        street1: { type: String, required: true, trim: true },
        street2: { type: String, required: false, trim: true },
        description: { type: String, required: false, trim: true },
        age: { type: String, required: false, trim: true },
        category: { type: String, required: true, trim: true },
        isHomeless: { type: Boolean, required: true },
        image: { type: String, required: true },
        telephone: { type: String, required: false, trim: true },
        expiresAt: { type: Date, required: false, default: null }, // Campo para la fecha de expiración
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Crear índice TTL para expiración automática
PetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Middleware para establecer fecha de expiración cuando isHomeless es true
PetSchema.pre("save", function (next) {
    if (this.isHomeless === true) {
        // Configurar para que expire en 30 días (ajustable según necesidad)
        this.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    } else {
        this.expiresAt = null; // Quitar fecha de expiración si no es homeless
    }
    next();
});

// Crear el modelo utilizando el esquema
const Pet = mongoose.models.Pet || mongoose.model("Pet", PetSchema);

export default Pet;
