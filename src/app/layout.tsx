import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const viewport: Viewport = {
    themeColor: [
        { color: "#bef264", media: "(prefers-color-scheme: light)" },
        { color: "#14532d", media: "(prefers-color-scheme: dark)" },
    ],
};
const siteConfig = {
    name: "PichiriKa",
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
                url: "https://pichirika.com/Metadata.jpg", // Must be an absolute URL
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
        images: ["https://pichirika.com/Metadata.jpg"], // Must be an absolute URL
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={`antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
