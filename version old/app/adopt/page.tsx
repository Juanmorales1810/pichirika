import PaginationSection from "@/components/pagination";
import { PetIcon, UserIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { fontMono } from "@/config/fonts";
import Link from "next/link";

export default async function AboutPage() {
	return (
		<div className="flex flex-col items-center w-full h-full min-h-[calc(100vh-64px)]">
			<div className="flex gap-4 py-2">
				<Button as={Link} href="/adopt/register-pet" color="success" className="font-semibold" endContent={<PetIcon className="dark:fill-white" />}>Registrar animal</Button>
				<Button as={Link} href="/adopt/login" disabled color="success" className="font-semibold" endContent={<UserIcon className="dark:fill-white" />}>Iniciar sesión</Button>
			</div>
			<h1 className={"font-bold text-center text-6xl " + fontMono.className}>Algunos PichiriKas</h1>
			<div className="flex flex-wrap max-w-5xl">
				<PaginationSection />
			</div>
		</div>
	);
}


