import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ILostPetSchema extends Document {
    _id: ObjectId | string;
    petName: string;
    description: string;
    lostDate: string;
    department: string;
    lat: string;
    lng: string;
    location: {
        type: string;
        coordinates: number[];
    };
    ownerName: string;
    phoneNumber: string;
    canCall: boolean;
    canWhatsapp: boolean;
    image: string;
    expiresAt?: Date;
    age?: string;
    category?: string;
}

// Definir el esquema para mascotas perdidas
const LostPetSchema = new Schema(
    {
        petName: {
            type: String,
            required: [true, "El nombre de la mascota es requerido"],
        },
        description: {
            type: String,
            required: [true, "La descripción es requerida"],
        },
        lostDate: {
            type: String,
            required: [true, "La fecha es requerida"],
        },
        department: {
            type: String,
            required: [true, "El departamento es requerido"],
        },
        lat: {
            type: String,
            required: [true, "La latitud es requerida"],
        },
        lng: {
            type: String,
            required: [true, "La longitud es requerida"],
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        ownerName: {
            type: String,
            required: [true, "El nombre del dueño es requerido"],
        },
        phoneNumber: {
            type: String,
            required: [true, "El número de teléfono es requerido"],
        },
        canCall: {
            type: Boolean,
            default: false,
        },
        canWhatsapp: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
            required: [true, "La imagen es requerida"],
        },
        age: {
            type: String,
            required: false,
            trim: true,
        },
        category: {
            type: String,
            required: false,
            trim: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Crear índice TTL para expiración automática
LostPetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Crear índice geoespacial
LostPetSchema.index({ location: "2dsphere" });

// Middleware para establecer fecha de expiración automática
LostPetSchema.pre("save", function (next) {
    // Configurar para que expire en 90 días
    this.expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

    if (this.lat && this.lng) {
        this.location = {
            type: "Point",
            coordinates: [parseFloat(this.lng), parseFloat(this.lat)], // MongoDB usa [longitud, latitud]
        };
    }
    next();
});

// Crear el modelo utilizando el esquema
const LostPet =
    mongoose.models.LostPet || mongoose.model("LostPet", LostPetSchema);

export default LostPet;
