import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Descubre las últimas tendencias, noticias y artículos de interés en nuestro blog",
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main>{children}</main>;
}
