import LostPet from "@/models/lost-pichirikas";
import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import { messages } from "@/utils/messages";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();

        const { searchParams } = new URL(req.url);
        const lat = parseFloat(searchParams.get("lat") || "0");
        const lng = parseFloat(searchParams.get("lng") || "0");
        const radius = parseFloat(searchParams.get("radius") || "2000"); // Radio en metros por defecto

        if (lat === 0 || lng === 0) {
            return NextResponse.json(
                { message: "Se requieren coordenadas válidas" },
                { status: 400 }
            );
        }

        // Usar $geoNear para encontrar mascotas cercanas
        const items = await LostPet.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat], // MongoDB usa [longitud, latitud]
                    },
                    $maxDistance: radius,
                },
            },
        }).sort({ createdAt: -1 });

        return NextResponse.json(
            {
                items,
                message: messages.success.getItme,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error al obtener mascotas cercanas:", error);
        return NextResponse.json(
            {
                message: "Error al obtener mascotas cercanas",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
