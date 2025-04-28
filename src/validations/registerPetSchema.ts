import { z } from "zod";

const department = [
    "capital",
    "santaLucia",
    "chimbas",
    "rawson",
    "pocito",
    "rivadavia",
    "albardon",
    "zonda",
    "DeMayo",
    "caucete",
    "iglesia",
    "jachal",
    "sarmiento",
    "sanMartin",
    "calingasta",
    "DeJulio",
    "angaco",
    "valleFertil",
    "ullum",
] as const;

export type Department = (typeof department)[number];

export const mappedDepartment: { [key in Department]: string } = {
    capital: "Capital",
    santaLucia: "Santa Lucía",
    chimbas: "Chimbas",
    rawson: "Rawson",
    pocito: "Pocito",
    rivadavia: "Rivadavia",
    albardon: "Albardón",
    zonda: "Zonda",
    DeMayo: "25 de Mayo",
    caucete: "Caucete",
    iglesia: "Iglesia",
    jachal: "Jáchal",
    sarmiento: "Sarmiento",
    sanMartin: "San Martín",
    calingasta: "Calingasta",
    DeJulio: "9 de Julio",
    angaco: "Angaco",
    valleFertil: "Valle Fértil",
    ullum: "Ullum",
};

const isFileListDefined = typeof FileList !== "undefined";

const imageSchema = isFileListDefined
    ? z
          .instanceof(FileList)
          .refine((files) => files.length > 0, {
              message: "Debe seleccionar un archivo de imagen.",
          })
          .refine(
              (files) => {
                  const validTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/jpg",
                      "image/webp",
                  ];
                  return validTypes.includes(files[0]?.type);
              },
              {
                  message:
                      "Formato de imagen no válido. Solo se permiten JPEG, PNG, JPG y WEBP.",
              }
          )
          .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
              message: "El tamaño de la imagen no debe exceder los 5MB.",
          })
    : z.any();

// Definimos el esquema de validación para el formulario de usuario
export const petSchema = z
    .object({
        name: z
            .string()
            .min(3, {
                message: "El nombre debe tener al menos 3 caracteres.",
            })
            .max(30, {
                message: "El nombre no debe exceder los 30 caracteres.",
            }),
        department: z.enum(department, {
            errorMap: () => ({ message: "Debes seleccionar un departamento." }),
        }),
        street1: z
            .string()
            .min(3, {
                message: "La calle debe tener al menos 3 caracteres.",
            })
            .max(120, {
                message: "La calle no debe exceder los 120 caracteres.",
            }),
        street2: z.string().optional(),
        description: z.string().optional(),
        age: z.string().optional(),
        category: z.string().optional(),
        isHomeless: z.boolean().optional(),
        telephone: z.string().optional(),
        namecontact: z.string().optional(),
        image: imageSchema,
    })
    .superRefine((data, ctx) => {
        // Si isHomeless es false, entonces telephone y namecontact deben estar definidos y deben tener un número específico de caracteres
        if (data.isHomeless === false) {
            if (!data.telephone) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["telephone"],
                    message: "El teléfono es requerido.",
                });
            } else if (
                data.telephone.length < 10 ||
                data.telephone.length > 15
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["telephone"],
                    message: "El teléfono debe tener entre 10 y 15 caracteres.",
                });
            }

            if (!data.namecontact) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["namecontact"],
                    message: "El Nombre de contacto es requerido.",
                });
            } else if (
                data.namecontact.length < 3 ||
                data.namecontact.length > 30
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["namecontact"],
                    message:
                        "El Nombre de contacto debe tener entre 3 y 30 caracteres.",
                });
            }
        }
    });
