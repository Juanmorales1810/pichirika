import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Preguntas frecuentes",
        template: `%s - ${"Preguntas frecuentes"}`,
    },
    description: "Preguntas frecuentes sobre la aplicación de mascotas",
    keywords: "preguntas, adopción, mascotas, animales",
};
export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className="">{children}</main>;
}
