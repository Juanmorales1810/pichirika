import PaginationSection from "@/components/pagination";
import { PetIcon, UserIcon } from "@/components/icons";
import { connectMongoDB } from "@/libs/mongodb";
import { Button } from "@nextui-org/button";
import { fontMono } from "@/config/fonts";
import Pet from "@/models/pichirikas";
import Link from "next/link";

export const dynamic = "force-dynamic";

const getItems = async function loadMenu() {
	await connectMongoDB();
	const ListPets = await Pet.find();
	return ListPets.map(product => {
		const obj = product.toObject();
		obj._id = obj._id.toString(); // Convierte _id a una cadena
		return obj;
	}); // Usa .toObject() para convertir cada producto a un objeto JavaScript simple
}

export default async function AboutPage() {
	const Pets = await getItems();
	return (
		<div className="flex flex-col items-center w-full h-full min-h-[calc(100vh-64px)]">
			<div className="flex gap-4 py-2">
				<Button as={Link} href="/adopt/register" color="success" className="font-semibold" endContent={<PetIcon className="dark:fill-white" />}>Registrar animal</Button>
				<Button disabled color="success" className="font-semibold" endContent={<UserIcon className="dark:fill-white" />}>Iniciar sesión</Button>
			</div>
			<h1 className={"font-bold text-center text-6xl " + fontMono.className}>Algunos PichiriKas</h1>
			<div className="flex flex-wrap max-w-5xl">
				<PaginationSection Array={Pets} />
			</div>
		</div>
	);
}


