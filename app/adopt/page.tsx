import { PetIcon, UserIcon } from "@/components/icons";
import PaginationSection from "@/components/pagination";
import { fontMono } from "@/config/fonts";
import { Button } from "@nextui-org/button";

const pichirika = [
	{
		"Nombre": "Gatito",
		"Ubicacion": "Caucete",
		"Fecha": "01/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Perrito",
		"Ubicacion": "Capital",
		"Fecha": "02/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Conejito",
		"Ubicacion": "Rivadavia",
		"Fecha": "03/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Pajarito",
		"Ubicacion": "Santa Lucia",
		"Fecha": "04/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Hamster",
		"Ubicacion": "Rawson",
		"Fecha": "05/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Cachorrito",
		"Ubicacion": "Chimbas",
		"Fecha": "06/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Gatita",
		"Ubicacion": "Pocito",
		"Fecha": "07/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Perrita",
		"Ubicacion": "Rivadavia",
		"Fecha": "08/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Conejita",
		"Ubicacion": "Caucete",
		"Fecha": "09/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Pajarita",
		"Ubicacion": "Santa Lucia",
		"Fecha": "10/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Hamsterita",
		"Ubicacion": "Rawson",
		"Fecha": "11/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Cachorrita",
		"Ubicacion": "Chimbas",
		"Fecha": "12/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Gatito",
		"Ubicacion": "Pocito",
		"Fecha": "13/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Perrito",
		"Ubicacion": "Rivadavia",
		"Fecha": "14/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Conejito",
		"Ubicacion": "Caucete",
		"Fecha": "15/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Pajarito",
		"Ubicacion": "Santa Lucia",
		"Fecha": "16/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Hamster",
		"Ubicacion": "Rawson",
		"Fecha": "17/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Cachorrito",
		"Ubicacion": "Chimbas",
		"Fecha": "18/05/2022",
		"Imagen": "/perro.webp"
	},
	{
		"Nombre": "Gatita",
		"Ubicacion": "Pocito",
		"Fecha": "19/05/2022",
		"Imagen": "/perro.webp"
	}
]
export default function AboutPage() {
	return (
		<div className="flex flex-col items-center w-full h-full min-h-[calc(100vh-64px)]">
			<div className="flex gap-4 py-2">
				<Button className="font-semibold" endContent={<PetIcon className="dark:fill-white" />}>Registrar animal</Button>
				<Button className="font-semibold" endContent={<UserIcon className="dark:fill-white" />}>Iniciar sesión</Button>
			</div>
			<h1 className={"font-bold text-center text-6xl " + fontMono.className}>Algunos PichiriKas</h1>
			<div className="flex flex-wrap max-w-5xl">
				<PaginationSection Array={pichirika} />
			</div>
		</div>
	);
}


