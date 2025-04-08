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
        const uploadOptions: {
            folder: string;
            resource_type: "image";
            public_id: string;
            tags: string[];
            expires_at: number;
            invalidate: boolean;
        } = {
            folder: "lost-pets",
            resource_type: "image",
            public_id: `${Date.now()}-${petName
                .toString()
                .replace(/\s+/g, "-")}`,
            tags: department
                ? [`mascotas-perdidas`, department.toString()]
                : ["mascotas-perdidas"],
            expires_at: Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60,
            invalidate: true,
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

        // Convertir lat y lng a números
        const latitude = parseFloat(lat as string);
        const longitude = parseFloat(lng as string);

        if (isNaN(latitude) || isNaN(longitude)) {
            return NextResponse.json(
                {
                    message: "Las coordenadas proporcionadas no son válidas",
                },
                { status: 400 }
            );
        }

        const newPet = new LostPet({
            petName,
            description,
            lostDate,
            department,
            lat: lat,
            lng: lng,
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
                newPet: savedPet,
                message: "Mascota registrada exitosamente",
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
