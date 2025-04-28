import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Veterinarias cercanas",
        template: `%s - ${"Veterinarias cercanas"}`,
    },
    description: "Veterinarias cercanas para el cuidado de tu mascota",
    keywords: "veterinarias, mascotas, cuidado",
};
export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className="">{children}</main>;
}
