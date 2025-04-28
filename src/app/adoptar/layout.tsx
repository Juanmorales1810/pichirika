import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Adopta una mascota",
        template: `%s - ${"Adopta una mascota"}`,
    },
    description: "Adopta una mascota y dale un hogar",
    keywords: "adopción, mascotas, animales",
};
export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className="">{children}</main>;
}
