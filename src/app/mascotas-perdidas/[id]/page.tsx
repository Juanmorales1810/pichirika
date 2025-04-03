import {
    type Department,
    mappedDepartment,
} from "@/validations/lost-pet-schema";
import { connectMongoDB } from "@/lib/mongodb";
import { fontMono } from "@/config/fonts";
import LostPet from "@/models/lost-pichirikas";
import Image from "next/image";
import { cache } from "react";
import Link from "next/link";
import { Phone, ArrowLeft } from "lucide-react";
import { unstable_ViewTransition as ViewTransition } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WhatsAppLogo } from "@/components/icons";
import Mapa from "@/components/map";

interface LostPetSchema {
    petName: string;
    description: string;
    lostDate: string;
    department: string;
    lat: string;
    lng: string;
    ownerName: string;
    phoneNumber: string;
    canCall: boolean;
    canWhatsapp: boolean;
    image: string;
    _id: string;
}

const getItem = cache(async function loadPet(params: string) {
    await connectMongoDB();
    const pet = await LostPet.findById(params);
    if (!pet) {
        throw new Error("Pet not found");
    }
    const obj = pet.toObject();
    obj._id = obj._id.toString();
    return obj;
});

export default async function PetDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const pet: LostPetSchema = await getItem(id);

    const location = `${
        pet.department in mappedDepartment
            ? mappedDepartment[pet.department as keyof typeof mappedDepartment]
            : pet.department
    }`;

    return (
        <section className="container max-w-6xl mx-auto px-4 py-20">
            <div>
                <Link
                    href="/mascotas-perdidas"
                    className="text-sm text-primary font-semibold hover:text-primary/80 flex items-center gap-1 mb-4 group"
                >
                    <ArrowLeft className="mr-2 size-5 group-hover:translate-x-1.5 transition-transform" />
                    Volver a la lista de mascotas
                </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                <div className="">
                    <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden border border-border shadow-lg">
                        <ViewTransition name={`${pet.petName}-image`}>
                            <Image
                                src={pet.image || "/placeholder.svg"}
                                alt={pet.petName}
                                fill
                                className="object-cover"
                                priority
                            />
                        </ViewTransition>
                    </div>
                </div>

                <div className="flex flex-col space-y-6">
                    <Card className="border-primary/20">
                        <CardHeader>
                            <div className="space-y-2">
                                <CardTitle
                                    className={`text-3xl text-primary font-bold uppercase ${fontMono.className}`}
                                >
                                    Hola mi nombre es&nbsp;
                                    <ViewTransition
                                        name={`${pet.petName}-name`}
                                    >
                                        <span>{pet.petName}</span>
                                    </ViewTransition>
                                </CardTitle>
                                <CardDescription className="text-lg font-medium">
                                    Me perdi en {location} el {pet.lostDate} y
                                    me gustaría volver a casa.
                                    <Mapa
                                        lat={Number(pet.lat)}
                                        lng={Number(pet.lng)}
                                    />
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-primary mb-2">
                                        Descripción:
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {pet.description || "Sin descripción"}
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary mb-2">
                                        Datos de contacto:
                                    </h3>
                                    <div className="space-y-1">
                                        <p className="text-sm">
                                            <span className="font-medium">
                                                Teléfono:
                                            </span>{" "}
                                            {pet.phoneNumber}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-medium">
                                                Nombre de contacto:
                                            </span>{" "}
                                            {pet.ownerName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                asChild
                                className="w-full sm:w-auto"
                                variant="default"
                            >
                                <Link href={`tel:${pet.phoneNumber}`}>
                                    <Phone className="mr-2 h-4 w-4" />
                                    Llamar
                                </Link>
                            </Button>

                            <Button
                                asChild
                                className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700"
                                variant="secondary"
                            >
                                <Link
                                    href={`https://wa.me/+54${pet.phoneNumber}?text=Hola%20${pet.ownerName}!%20Me%20gustaria%20saber%20mas%20de!%20👉🏾%20${pet.petName}.%20Me%20das%20mas%20informacion%20por%20favor?`}
                                    target="_blank"
                                >
                                    <WhatsAppLogo className="mr-2 h-4 w-4" />
                                    WhatsApp
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    );
}
