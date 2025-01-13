import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";
import { Metadata, Viewport } from "next";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Toaster } from 'sonner'
import clsx from "clsx";

import "@/styles/globals.css";

export const viewport: Viewport = {
	themeColor: [
		{ color: "#bef264", media: "(prefers-color-scheme: light)" },
		{ color: "#14532d", media: "(prefers-color-scheme: dark)" },
	],
}

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: ["Adopción", "Mascotas", "Perros", "Gatos", "Adopta", "Adopta una mascota", "Adopta un perro", "Adopta un gato", "Adopta un animal", "Adopta un amigo", "Adopta un compañero", "Adopta un compañero", "Cuidados", "Veranarías Cercanas", "Cuidados animales"],
	icons: {
		icon: "/favicon.ico",
		apple: "/icon-192x192.png",
	},
	manifest: "/manifest.json",
	creator: "Juan Morales",
	openGraph: {
		title: siteConfig.name,
		description: siteConfig.description,
		url: 'https://pichirika.com',
		siteName: 'PichiriKa',
		images: [
			{
				url: 'https://pichirika.com/Metadata.jpg', // Must be an absolute URL
				width: 1200,
				height: 630,
			},

		],
		locale: 'es_AR',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		siteId: '1467726470533754880',
		creator: '@Juanmora1810',
		creatorId: '1467726470533754880',
		images: ['https://pichirika.com/Metadata.jpg'], // Must be an absolute URL
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-zinc-50 font-sans antialiased dark:bg-zinc-950 transition-colors duration-700 ease-in-out",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
					<div className="relative flex flex-col">
						<Navbar />
						<main className="flex flex-col w-full mx-auto flex-grow">
							{children}
							<SpeedInsights />
							<Toaster />
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
