import { Department, mappedDepartment } from "@/validations/registerPetSchema";
import { connectMongoDB } from "@/libs/mongodb";
import { fontMono } from "@/config/fonts";
import Pet from "@/models/pichirikas";
import Image from "next/image";
import { cache } from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { CallIcon, WhatsAppLogo } from "@/components/icons";

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
        throw new Error('Pet not found');
    }
    const obj = pet.toObject();
    obj._id = obj._id.toString(); // Convierte _id a una cadena
    return obj; // Usa .toObject() para convertir cada producto a un objeto JavaScript simple
})

export default async function App({ params }: { params: Params }) {
    const pet: PetSchema = await getItem(params.id);
    console.log(pet);

    return (
        <section className="flex flex-col gap-4 mt-10 px-2 md:flex-row md:h-[calc(100vh-104px)]">
            <div className="flex flex-col justify-center items-center w-full">
                <Image className="rounded-xl md:hidden h-[300px] w-[300px] object-cover" src={pet.image} alt={pet.name} width={300} height={300} />
                <Image className="rounded-xl hidden md:block h-[500px] w-[500px] object-cover" src={pet.image} alt={pet.name} width={500} height={500} />
            </div>
            <article className="flex flex-col items-center text-center gap-2 md:justify-center md:items-start md:text-start">
                <header className="">
                    <h1 className={`text-3xl text-green-950 dark:text-lime-300 font-bold uppercase ${fontMono.className}`}>Hola mi nombre es&nbsp;{pet.name}</h1>
                    <p className="text-lg text-pretty text-green-950 dark:text-lime-300 font-semibold">Estoy en&nbsp;{pet.department in mappedDepartment ? mappedDepartment[pet.department] : pet.department}&nbsp;en la calle {pet.street1}{pet.street2 === "" ? null : ` y ${pet.street2}`}</p>
                </header>
                {
                    pet.description === "" ? <main className="bg-lime-100 rounded-xl w-full border-2 px-3 py-1 border-green-700 max-w-xl">
                        <p className="text-lg text-green-950  font-bold">Descripción:</p>
                        <p className="text-sm text-green-950  font-semibold">Sin descripción</p>
                        {pet.isHomeless === "true" && <p className="text-sm text-red-500  font-semibold">Esta en situación de calle</p>}
                    </main> : <main className="bg-lime-100 rounded-xl w-full border-2 px-3 py-1 border-green-700 max-w-xl">
                        <p className="text-lg text-green-950  font-bold">Descripción:</p>
                        <p className="text-sm text-green-950  font-semibold">{pet.description}</p>
                        {pet.isHomeless === "true" && <p className="text-sm text-red-500  font-semibold">Esta en situación de calle</p>}
                    </main>
                }
                {
                    pet.isHomeless === "false" && <footer className="bg-lime-100 rounded-xl w-full border-2 px-3 py-1 border-green-700 max-w-xl">
                        <p className="text-lg text-green-950  font-bold">Datos de contacto:</p>
                        <p className="text-sm text-green-950  font-semibold">Teléfono: {pet.telephone}</p>
                        <p className="text-sm text-green-950  font-semibold">Nombre de contacto: {pet.namecontact}</p>
                    </footer>
                }
                {
                    pet.isHomeless === "false" &&
                    <div className="flex justify-around w-full">
                        <Button
                            as={Link}
                            color="success"
                            variant="shadow"
                            className="text-md w-32 mt-4 text-zinc-950 dark:text-zinc-100  font-bold"
                            href={`tel:${pet.telephone}`}
                            endContent={<CallIcon className="fill-zinc-950 dark:fill-zinc-200" />}
                        >
                            Llamar
                        </Button>
                        <Button
                            className="text-md w-36 mt-4 text-zinc-950 dark:text-zinc-100  font-bold"
                            as={Link}
                            color="success"
                            variant="shadow"
                            target="_blank"
                            href={`https://wa.me/+54${pet.telephone}?text=Hola%20${pet.namecontact}!%20Me%20gustaria%20saber%20mas%20de!%20👉🏾%20${pet.name}.%20Me%20das%20mas%20informacion%20por%20favor?`}
                            endContent={<WhatsAppLogo className="fill-zinc-950 dark:fill-zinc-200" />}
                        >
                            WhatsApp
                        </Button>
                    </div>
                }
            </article>
        </section>
    )
}