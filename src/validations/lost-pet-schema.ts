import { z } from "zod";

// Lista de departamentos
export const department = [
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

// Tipo para los departamentos
export type Department = (typeof department)[number];

// Mapeo de departamentos para mostrar nombres legibles
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
// Esquema de validación para imágenes
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
// Esquema de validación completo para el formulario de animales perdidos
export const lostPetFormSchema = z.object({
    // Datos del animal
    petName: z
        .string()
        .min(2, {
            message: "El nombre debe tener al menos 2 caracteres.",
        })
        .max(30, {
            message: "El nombre no debe exceder los 30 caracteres.",
        }),
    description: z
        .string()
        .min(10, {
            message: "La descripción debe tener al menos 10 caracteres.",
        })
        .max(500, {
            message: "La descripción no debe exceder los 500 caracteres.",
        }),
    lostDate: z.string().min(1, {
        message: "Debe seleccionar la fecha en que se perdió el animal.",
    }),
    department: z.enum(department, {
        errorMap: () => ({ message: "Debes seleccionar un departamento." }),
    }),
    image: imageSchema,

    // Ubicación
    lat: z.string().min(1, {
        message: "Debes seleccionar una ubicación en el mapa.",
    }),
    lng: z.string().min(1, {
        message: "Debes seleccionar una ubicación en el mapa.",
    }),

    // Datos del dueño
    ownerName: z
        .string()
        .min(3, {
            message: "El nombre debe tener al menos 3 caracteres.",
        })
        .max(50, {
            message: "El nombre no debe exceder los 50 caracteres.",
        }),
    phoneNumber: z
        .string()
        .min(10, {
            message: "El número de teléfono debe tener al menos 10 dígitos.",
        })
        .max(15, {
            message: "El número de teléfono no debe exceder los 15 dígitos.",
        }),
    canCall: z.boolean().default(false),
    canWhatsapp: z.boolean().default(false),
});

// Tipo inferido del esquema para usar en el formulario
export type LostPetFormValues = z.infer<typeof lostPetFormSchema>;
