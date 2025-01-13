import { z } from "zod";

// Definimos el esquema de validación para el formulario de usuario
export const loginSchema = z.object({
    correo: z.string().email({
        message: "El correo electrónico no es válido.",
    }),
    password: z
        .string()
        .min(8, {
            message: "La contraseña debe tener al menos 8 caracteres.",
        })
        .max(30, {
            message: "La contraseña no debe exceder los 30 caracteres.",
        }),
});
