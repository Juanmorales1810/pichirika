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
                  const validTypes = ["image/jpeg", "image/png", "image/gif"];
                  return validTypes.includes(files[0]?.type);
              },
              {
                  message:
                      "Formato de imagen no válido. Solo se permiten JPEG, PNG y GIF.",
              }
          )
          .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
              message: "El tamaño de la imagen no debe exceder los 5MB.",
          })
    : z.any();

// Definimos el esquema de validación para el formulario de usuario
export const userSchema = z.object({
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
    isHomeless: z.boolean().optional(),
    image: imageSchema,
});
