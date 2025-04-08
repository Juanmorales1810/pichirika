import Pet, { IPetSchema } from "@/models/pichirikas";
import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { messages } from "@/utils/messages";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const search = searchParams.get("search") || "";

        const skip = (page - 1) * limit;

        const filter = search ? { titulo: new RegExp(search, "i") } : {};

        const items = await Pet.find(filter)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);

        const totalItems = await Pet.countDocuments(filter);

        return NextResponse.json(
            {
                items,
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                message: messages.success.getItme,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error al obtener datos de Mascotas:", error);
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );
    }
}

export async function POST(NextRequest: NextRequest) {
    const data = await NextRequest.formData();
    const name = data.get("name");
    const department = data.get("department");
    const street1 = data.get("street1");
    const street2 = data.get("street2");
    const description = data.get("description");
    const isHomeless = data.get("isHomeless");
    const telephone = data.get("telephone");
    const namecontact = data.get("namecontact");
    const image = data.get("image");

    console.log("Data:", data);

    connectMongoDB();
    try {
        if (!name || !image) {
            return NextResponse.json(
                {
                    message: messages.error.needProps,
                },
                {
                    status: 400,
                }
            );
        }

        if (!image || typeof image === "string") {
            throw new Error("No se proporcionó ninguna imagen válida");
        }

        const bytes = await (image as Blob).arrayBuffer();
        const buffer = await Buffer.from(bytes);

        // En la configuración de opciones de carga:
        const uploadOptions: {
            folder: string;
            resource_type: "image";
            public_id: string;
            tags: string[];
            expires_at: number;
            invalidate: boolean;
        } = {
            folder: "pets", // Carpeta donde se guardarán las imágenes
            resource_type: "image", // Aserción de tipo para resolver el error
            public_id: `${Date.now()}-${name.toString().replace(/\s+/g, "-")}`,
            tags: department
                ? [`mascotas`, department.toString()]
                : ["mascotas"],
            // Añadir opciones de expiración
            expires_at: isHomeless
                ? Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 // Expiración en 30 días (en timestamp Unix)
                : Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // Expiración en 1 año
            invalidate: true, // Asegura que la imagen se elimine completamente
        };

        const resultImag: any = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(uploadOptions, (error, result) => {
                    if (error) {
                        console.log("Error al subir la imagen:", error);

                        reject(error);
                    } else {
                        console.log("Imagen subida");
                        resolve(result);
                    }
                })
                .end(buffer);
        });
        console.log("Imagen subida:", resultImag);

        const imageUrl = resultImag.secure_url;
        const body = JSON.stringify({
            name,
            department,
            street1,
            street2,
            description,
            isHomeless,
            telephone,
            namecontact,
            image: imageUrl,
        });
        const obj = JSON.parse(body);
        console.log(obj);
        const newPet: IPetSchema = new Pet({
            name,
            department,
            street1,
            street2,
            description,
            isHomeless,
            telephone,
            namecontact,
            image: imageUrl,
        });
        const savedPet = await newPet.save();
        console.log("Mascota guardada:", savedPet);
        return NextResponse.json(
            {
                newMenu: savedPet,
                message: messages.success.menuCreated,
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        console.error("Error al guardar la mascota:", error);
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );
    }
}
