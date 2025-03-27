import {
    type Department,
    mappedDepartment,
} from "@/validations/registerPetSchema";
import { connectMongoDB } from "@/lib/mongodb";
import { fontMono } from "@/config/fonts";
import Pet from "@/models/pichirikas";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WhatsAppLogo } from "@/components/icons";

interface Params {
    id: string;
}

interface PetSchema {
    _id: string;
    name: string;
    department: Department;
    street1: string;
    street2: string;
    description: string;
    isHomeless: string;
    telephone: string;
    namecontact: string;
    image: string;
}

const getItem = cache(async function loadPet(params: string) {
    await connectMongoDB();
    const pet = await Pet.findById(params);
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
    const pet: PetSchema = await getItem(id);

    const location = `${
        pet.department in mappedDepartment
            ? mappedDepartment[pet.department as keyof typeof mappedDepartment]
            : pet.department
    }, ${pet.street1}${pet.street2 ? `, ${pet.street2}` : ""}`;
    const isHomeless = pet.isHomeless === "true";

    return (
        <section className="container max-w-6xl mx-auto px-4 py-20">
            <div>
                <Link
                    href="/adoptar"
                    className="text-sm text-primary font-semibold hover:text-primary/80 flex items-center gap-1 mb-4 group"
                >
                    <ArrowLeft className="mr-2 size-5 group-hover:translate-x-1.5 transition-transform" />
                    Volver a la lista de mascotas
                </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                <div className="">
                    <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden border border-border shadow-lg">
                        <ViewTransition name={`${pet.name}-image`}>
                            <Image
                                src={pet.image || "/placeholder.svg"}
                                alt={pet.name}
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
                                    <ViewTransition name={`${pet.name}-name`}>
                                        <span>{pet.name}</span>
                                    </ViewTransition>
                                </CardTitle>
                                <CardDescription className="text-lg font-medium">
                                    Estoy en {location}
                                </CardDescription>
                                {isHomeless && (
                                    <Badge
                                        variant="destructive"
                                        className="mt-1"
                                    >
                                        En situación de calle
                                    </Badge>
                                )}
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

                                {!isHomeless && (
                                    <>
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
                                                    {pet.telephone}
                                                </p>
                                                <p className="text-sm">
                                                    <span className="font-medium">
                                                        Nombre de contacto:
                                                    </span>{" "}
                                                    {pet.namecontact}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </CardContent>

                        {!isHomeless && (
                            <CardFooter className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    asChild
                                    className="w-full sm:w-auto"
                                    variant="default"
                                >
                                    <Link href={`tel:${pet.telephone}`}>
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
                                        href={`https://wa.me/+54${pet.telephone}?text=Hola%20${pet.namecontact}!%20Me%20gustaria%20saber%20mas%20de!%20👉🏾%20${pet.name}.%20Me%20das%20mas%20informacion%20por%20favor?`}
                                        target="_blank"
                                    >
                                        <WhatsAppLogo className="mr-2 h-4 w-4" />
                                        WhatsApp
                                    </Link>
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </div>
        </section>
    );
}
