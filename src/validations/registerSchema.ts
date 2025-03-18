import { z } from "zod";

// Definimos el esquema de validación para el formulario de usuario
export const registerSchema = z
    .object({
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
            })
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                {
                    message:
                        "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial.",
                }
            ),
        repeatepassword: z.string().min(8, {
            message: "La contraseña repetida debe tener al menos 8 caracteres.",
        }),
        name: z.string().min(3, {
            message: "El nombre debe tener al menos 3 caracteres.",
        }),
        lastName: z.string().min(3, {
            message: "El apellido debe tener al menos 3 caracteres.",
        }),
        phone: z
            .string()
            .min(10, {
                message: "El teléfono debe tener al menos 10 caracteres.",
            })
            .max(14, {
                message: "El teléfono no debe exceder los 14 caracteres.",
            }),
        itsRefuge: z.boolean().optional(),
        refugeteTelephone: z.string().optional(),
        refugeteName: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.repeatepassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["repeatepassword"],
                message: "Las contraseñas no coinciden.",
            });
        }
        // Si isHomeless es false, entonces telephone y namecontact deben estar definidos y deben tener un número específico de caracteres
        if (data.itsRefuge === true) {
            if (!data.refugeteTelephone) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["refugeteTelephone"],
                    message: "El teléfono del refugio es requerido.",
                });
            } else if (
                data.refugeteTelephone.length < 10 ||
                data.refugeteTelephone.length > 15
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["refugeteTelephone"],
                    message: "El teléfono debe tener entre 10 y 15 caracteres.",
                });
            }

            if (!data.refugeteName) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["refugeteName"],
                    message: "El Nombre del refugio es requerido.",
                });
            } else if (
                data.refugeteName.length < 3 ||
                data.refugeteName.length > 30
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["refugeteName"],
                    message:
                        "El Nombre del refugio debe tener entre 3 y 30 caracteres.",
                });
            }
        }
    });
