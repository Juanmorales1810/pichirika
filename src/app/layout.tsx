import { unstable_ViewTransition as ViewTransition } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/interface/Header";
import type { Metadata, Viewport } from "next";
import { fontMono } from "@/config/fonts";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";

export const viewport: Viewport = {
    themeColor: [
        { color: "#bef264", media: "(prefers-color-scheme: light)" },
        { color: "#14532d", media: "(prefers-color-scheme: dark)" },
    ],
};
const siteConfig = {
    name: "PichiriKa | Adopta una mascota",
    description: "Adopta una mascota y dale un hogar",
};

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
        "Adopción",
        "Mascotas",
        "Perros",
        "Gatos",
        "Adopta",
        "Adopta una mascota",
        "Adopta un perro",
        "Adopta un gato",
        "Adopta un animal",
        "Adopta un amigo",
        "Adopta un compañero",
        "Adopta un compañero",
        "Cuidados",
        "Veranarías Cercanas",
        "Cuidados animales",
    ],
    icons: {
        icon: "/favicon.ico",
        apple: "/icon-192x192.png",
    },
    manifest: "/manifest.json",
    creator: "Juan Morales",
    openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        url: "https://pichirika.com",
        siteName: "PichiriKa",
        images: [
            {
                url: "https://pichirika.com/Metadata.jpg",
                width: 1200,
                height: 630,
            },
        ],
        locale: "es_AR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        siteId: "1467726470533754880",
        creator: "@Juanmora1810",
        creatorId: "1467726470533754880",
        images: ["https://pichirika.com/Metadata.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body
                className={`${fontMono.variable} antialiased relative [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-lime-50 [&::-webkit-scrollbar-thumb]:bg-lime-500 bg-lime-50 transition-colors dark:bg-zinc-950`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                >
                    <ViewTransition name="page-transition">
                        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)]"></div>
                        <Header />
                        {children}
                        <SpeedInsights />
                        <Toaster />
                    </ViewTransition>
                </ThemeProvider>
            </body>
        </html>
    );
}
