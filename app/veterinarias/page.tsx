import VeterinariasCercanas from "@/components/veterinarias";
import { fontMono } from "@/config/fonts";
import clsx from "clsx";

export default function PricingPage() {
	return (
		<div className="flex flex-col items-center w-full h-full max-w-5xl gap-2">
			<h1 className={clsx(
				"text-5xl font-bold text-center",
				fontMono.className
			)}>Veterinarias cercanas</h1>
			<p className="text-lg text-center hidden md:bloc">
				Encuentra veterinarias cercanas a tu ubicación.
			</p>
			<VeterinariasCercanas />
		</div>
	);
}
