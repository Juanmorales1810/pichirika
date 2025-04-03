import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ILostPetSchema extends Document {
    _id: ObjectId | string;
    petName: string;
    description: string;
    lostDate: string;
    department: string;
    lat: string;
    lng: string;
    ownerName: string;
    phoneNumber: string;
    canCall: boolean;
    canWhatsapp: boolean;
    image: string;
    expiresAt?: Date;
}

// Definir el esquema para mascotas perdidas
const LostPetSchema = new Schema(
    {
        petName: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        lostDate: { type: String, required: true },
        department: { type: String, required: true, trim: true },
        lat: { type: String, required: true },
        lng: { type: String, required: true },
        ownerName: { type: String, required: true, trim: true },
        phoneNumber: { type: String, required: true, trim: true },
        canCall: { type: Boolean, default: false },
        canWhatsapp: { type: Boolean, default: false },
        image: { type: String, required: true },
        expiresAt: { type: Date, required: false, default: null },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Crear índice TTL para expiración automática
LostPetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Middleware para establecer fecha de expiración automática
LostPetSchema.pre("save", function (next) {
    // Configurar para que expire en 90 días
    this.expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    next();
});

// Crear el modelo utilizando el esquema
const LostPet =
    mongoose.models.LostPet || mongoose.model("LostPet", LostPetSchema);

export default LostPet;
