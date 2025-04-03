import LostPet, { ILostPetSchema } from "@/models/lost-pichirikas";
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

        const items = await LostPet.find(filter)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);

        const totalItems = await LostPet.countDocuments(filter);

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
    const petName = data.get("petName");
    const description = data.get("description");
    const lostDate = data.get("lostDate");
    const department = data.get("department");
    const lat = data.get("lat");
    const lng = data.get("lng");
    const ownerName = data.get("ownerName");
    const phoneNumber = data.get("phoneNumber");
    const canCall = data.get("canCall") === "true";
    const canWhatsapp = data.get("canWhatsapp") === "true";
    const image = data.get("image");

    console.log("Data:", data);

    connectMongoDB();
    try {
        if (!petName || !image) {
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
        const uploadOptions = {
            folder: "lost-pets", // Carpeta donde se guardarán las imágenes
            resource_type: "image" as "image", // Aserción de tipo para resolver el error
            public_id: `${Date.now()}-${petName
                .toString()
                .replace(/\s+/g, "-")}`,
            tags: department
                ? [`mascotas-perdidas`, department.toString()]
                : ["mascotas-perdidas"],
            // Añadir opciones de expiración
            expires_at: Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60, // Expiración en 90 días (en timestamp Unix)
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
            petName,
            description,
            lostDate,
            department,
            lat,
            lng,
            ownerName,
            phoneNumber,
            canCall,
            canWhatsapp,
            image: imageUrl,
        });
        const obj = JSON.parse(body);
        console.log(obj);
        const newPet: ILostPetSchema = new LostPet({
            petName,
            description,
            lostDate,
            department,
            lat,
            lng,
            ownerName,
            phoneNumber,
            canCall,
            canWhatsapp,
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
