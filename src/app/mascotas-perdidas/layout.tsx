import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Mascotas perdidas",
        template: `%s - ${"Mascotas perdidas"}`,
    },
    description: "Mascotas perdidas y cómo ayudar",
    keywords: "mascotas perdidas, ayuda, animales",
};
export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className="">{children}</main>;
}
