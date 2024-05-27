import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

export const viewport: Viewport = {
	themeColor: [
		{ color: "#06b6d4", media: "(prefers-color-scheme: light)" },
		{ color: "#06b6d4", media: "(prefers-color-scheme: light)" },
	],
}

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
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
					"min-h-screen bg-zinc-100 font-sans antialiased dark:bg-zinc-950 transition-colors duration-700 ease-in-out",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col">
						<Navbar />
						<main className="flex flex-col w-full mx-auto flex-grow">
							{children}
						</main>
						{/* <footer className="w-full flex items-center justify-center py-3">
							<Link
								isExternal
								className="flex items-center gap-1 text-current"
								href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
								title="Portfolio de Juan Morales"
							>
								<span className="text-default-600">Hecho con 💖 por</span>
								<p className="text-primary">Juan Morales.</p>
							</Link>
						</footer> */}
					</div>
				</Providers>
			</body>
		</html>
	);
}
