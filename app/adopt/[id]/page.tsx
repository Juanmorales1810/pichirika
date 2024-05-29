import { Department, mappedDepartment } from "@/validations/userSchema";
import { connectMongoDB } from "@/libs/mongodb";
import { fontMono } from "@/config/fonts";
import Pet from "@/models/pichirikas";
import Image from "next/image";
import { cache } from "react";

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
                <Image className="rounded-xl md:hidden" src={pet.image} alt={pet.name} width={300} height={300} />
                <Image className="rounded-xl hidden md:block" src={pet.image} alt={pet.name} width={500} height={500} />
            </div>
            <div className="flex flex-col items-center text-center gap-2 md:justify-center md:items-start md:text-start">
                <h1 className={`text-3xl text-green-950 dark:text-lime-300 font-bold uppercase ${fontMono.className}`}>Hola mi nombre es&nbsp;{pet.name}</h1>
                <div className="">
                    <p className="text-lg text-pretty text-green-950 dark:text-lime-300 font-semibold">Estoy en&nbsp;{pet.department in mappedDepartment ? mappedDepartment[pet.department] : pet.department}&nbsp;en la calle {pet.street1}{pet.street2 === "" ? null : ` y ${pet.street2}`}</p>
                </div>
                {
                    pet.description === "" ? <div className="bg-lime-100 rounded-xl w-full border-2 px-3 py-1 border-green-700">
                        <p className="text-lg text-green-950  font-bold">Descripción:</p>
                        <p className="text-sm text-green-950  font-semibold">Sin descripción</p>
                        {pet.isHomeless === "true" && <p className="text-sm text-red-500  font-semibold">Esta en situación de calle</p>}
                    </div> : <div className="bg-lime-100 rounded-xl w-full border-2 px-3 py-1 border-green-700">
                        <p className="text-lg text-green-950  font-bold">Descripción:</p>
                        <p className="text-sm text-green-950  font-semibold">{pet.description}</p>
                        {pet.isHomeless === "true" && <p className="text-sm text-red-500  font-semibold">Esta en situación de calle</p>}
                    </div>
                }

            </div>
        </section>
    )
}