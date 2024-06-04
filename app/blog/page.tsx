import { WhatsAppLogo } from "@/components/icons";
import { fontMono } from "@/config/fonts";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function BlogPage() {
	return (
		<div className="flex flex-col items-center gap-2">
			<h1 className={`text-7xl font-extrabold ${fontMono.className}`}>Blogs</h1>
			<p className="text-2xl">&#128679;Esta pagina esta en proceso&#128679;</p>
			<p className="text-2xl">Si tenes alguna idea o conoces a algún profesional que quiera dar su testimonio háblame!</p>
			<Button
				className="text-md w-36 mt-4 text-zinc-950 dark:text-zinc-100 font-bold"
				as={Link}
				color="success"
				variant="shadow"
				target="_blank"
				href={`https://wa.me/+542646216944?text=Hola%20Me%20gustaria%20aportar%20para%20la%20seccion%20de%20blogs%20das%20mas%20😊`}
				endContent={<WhatsAppLogo className="fill-zinc-950 dark:fill-zinc-200" />}
			>
				WhatsApp
			</Button>
		</div>
	);
}
