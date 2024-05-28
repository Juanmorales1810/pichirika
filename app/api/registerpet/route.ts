import Pet, { IPetSchema } from "@/models/pichirikas";
import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { messages } from "@/utils/messages";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function GET() {
    try {
        await connectMongoDB();

        const menu = await Pet.find();

        return NextResponse.json(
            {
                menu,
                message: messages.success.getItme,
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        console.error("Error al obtener los datos de Mascotas:", error);
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
        console.log("Imagen subida:", buffer);

        const resultImag: any = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({}, (error, result) => {
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
            image: imageUrl,
        });
        const savedPet = await newPet.save();
        console.log("Menú guardado:", savedPet);
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
        console.error("Error al guardar el menú:", error);
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );
    }
}
