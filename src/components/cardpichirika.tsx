"use client";

import { unstable_ViewTransition as ViewTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2 } from "lucide-react";
import { useState } from "react";
import type React from "react";
import Image from "next/image";
import Link from "next/link";

// Assuming these are imported from your existing code
import {
    type Department,
    mappedDepartment,
} from "@/validations/registerPetSchema";
import { fontMono } from "@/config/fonts";

interface CardPetAdoptionProps {
    id: string;
    title: string;
    image: string;
    ubication: Department;
    skeleton?: boolean;
    species?: string; // Optional: to show if it's a dog, cat, etc.
    age?: string; // Optional: to show the age of the pet
    lostPet?: boolean; // Optional: to show if it's a lost pet
}

export default function CardPetAdoption(props: CardPetAdoptionProps) {
    const {
        title,
        image,
        ubication,
        id,
        skeleton,
        species = "Otro",
        age = "Desconocida",
        lostPet = false,
    } = props;

    const [shareSuccess, setShareSuccess] = useState(false);

    const toggleShareButton = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Compartir usando Web Share API
        const url =
            typeof window !== "undefined"
                ? lostPet
                    ? `${window.location.origin}/mascotas-perdidas/${id}`
                    : `${window.location.origin}/adoptar/${id}`
                : "";

        const shareData = {
            title: `${lostPet ? "Mascota Perdida" : "Adopta a"} ${title}`,
            text: `${
                lostPet ? "Ayuda a encontrar a" : "Adopta a"
            } ${title}, ${species.toLowerCase()} ${
                lostPet ? "perdido" : "en adopción"
            } en ${mappedDepartment[ubication]}${
                age !== "Desconocida" ? `, edad: ${age}` : ""
            }`,
            url: url,
        }; // Comprobación simplificada para dispositivos móviles
        const isMobileDevice =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                typeof navigator !== "undefined" ? navigator.userAgent : ""
            );

        // En móviles, intentamos usar la API share directamente
        if (
            isMobileDevice &&
            typeof navigator !== "undefined" &&
            "share" in navigator
        ) {
            try {
                navigator
                    .share(shareData)
                    .then(() => {
                        console.log("Contenido compartido con éxito");
                        setShareSuccess(true);
                        setTimeout(() => setShareSuccess(false), 2000);
                    })
                    .catch((error) => {
                        console.log("Error al compartir:", error);
                        // Fallback: copiar al portapapeles
                        copyToClipboard(url);
                    });
            } catch (error) {
                console.log("Error al usar Web Share API:", error);
                copyToClipboard(url);
            }
            // Para navegadores de escritorio, verificamos si pueden compartir
        } else if (
            typeof navigator !== "undefined" &&
            "share" in navigator &&
            "canShare" in navigator &&
            navigator.canShare &&
            navigator.canShare(shareData)
        ) {
            navigator
                .share(shareData)
                .then(() => {
                    console.log("Contenido compartido con éxito");
                    setShareSuccess(true);
                    setTimeout(() => setShareSuccess(false), 2000);
                })
                .catch((error) => {
                    console.log("Error al compartir:", error);
                    // Intentar el método de copia al portapapeles como fallback
                    copyToClipboard(url);
                });
        } else {
            // Fallback si Web Share API no está disponible
            copyToClipboard(url);
        }
    };

    // Función auxiliar para copiar al portapapeles
    const copyToClipboard = (text: string) => {
        try {
            if (typeof navigator !== "undefined" && "clipboard" in navigator) {
                navigator.clipboard.writeText(text);
                setShareSuccess(true);
                setTimeout(() => setShareSuccess(false), 2000);
            } else {
                // Método alternativo para navegadores que no soportan clipboard API
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    document.execCommand("copy");
                    setShareSuccess(true);
                    setTimeout(() => setShareSuccess(false), 2000);
                } catch (err) {
                    console.error("Error al copiar el enlace:", err);
                    alert(
                        "No se pudo compartir. Intenta copiar el enlace manualmente."
                    );
                }

                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error("Error al copiar el enlace:", err);
            alert(
                "No se pudo compartir. Intenta copiar el enlace manualmente."
            );
        }
    };

    if (skeleton) {
        return (
            <article className="flex flex-col min-w-48 max-w-60 bg-lime-50 dark:bg-lime-800 rounded-2xl p-3 border-2 border-lime-700 dark:border-lime-400">
                <div className="aspect-square w-full bg-lime-200 dark:bg-lime-700 animate-pulse rounded-xl" />
                <div className="p-2 space-y-2">
                    <div className="h-5 w-3/4 bg-lime-200 dark:bg-lime-700 animate-pulse rounded-md" />
                    <div className="h-4 w-1/2 bg-lime-200 dark:bg-lime-700 animate-pulse rounded-md" />
                    <div className="h-4 w-3/4 bg-lime-200 dark:bg-lime-700 animate-pulse rounded-md" />
                    <div className="h-8 w-full bg-lime-200 dark:bg-lime-700 animate-pulse rounded-md mt-2" />
                </div>
            </article>
        );
    }

    return (
        <article className="flex flex-col min-w-40 max-w-48 bg-lime-50 dark:bg-lime-950 rounded-2xl p-3 border-2 border-lime-700 dark:border-lime-700 hover:shadow-md transition-shadow">
            <div className="relative">
                <Link
                    href={
                        lostPet ? `/mascotas-perdidas/${id}` : `/adoptar/${id}`
                    }
                    className="block"
                >
                    <ViewTransition name={`${title}-image`}>
                        <Image
                            className="rounded-xl aspect-square object-cover"
                            src={image || "/placeholder.svg"}
                            alt={title}
                            width={200}
                            height={200}
                        />
                    </ViewTransition>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-7 w-7 rounded-full bg-lime-100/80 dark:bg-lime-700/80 backdrop-blur-sm hover:bg-lime-200 dark:hover:bg-lime-600 hover:shadow-md transition-shadow"
                        onClick={toggleShareButton}
                    >
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Compartir</span>
                    </Button>

                    {/* Mensaje de confirmación */}
                    {shareSuccess && (
                        <div className="absolute bottom-2 right-2 left-2 bg-lime-600/90 text-white text-xs py-1 px-2 rounded-md backdrop-blur-sm text-center transition-opacity animate-in fade-in slide-in-from-bottom duration-300">
                            {typeof navigator !== "undefined" &&
                            "share" in navigator
                                ? "¡Compartido!"
                                : "¡Enlace copiado!"}
                        </div>
                    )}
                </Link>
            </div>

            <div className="p-1 pt-2">
                <div className="flex justify-between items-start mb-1">
                    <ViewTransition name={`${title}-name`}>
                        <h3
                            className={`text-lg font-bold line-clamp-1 ${fontMono.className}`}
                        >
                            {title}
                        </h3>
                    </ViewTransition>
                    <Badge
                        variant="outline"
                        className="ml-1 text-xs h-5 px-1.5 bg-lime-100 dark:bg-lime-700 border-lime-300 dark:border-lime-500 text-lime-800 dark:text-lime-200"
                    >
                        {species}
                    </Badge>
                </div>

                <div className="flex flex-col gap-0.5 my-1">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-lime-700 dark:text-lime-300">
                            Ubicación:
                        </span>
                        <span className="font-semibold text-lime-800 dark:text-lime-200">
                            {ubication in mappedDepartment
                                ? mappedDepartment[ubication]
                                : ubication}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-lime-700 dark:text-lime-300">
                            Edad:
                        </span>
                        <span className="font-semibold text-lime-800 dark:text-lime-200">
                            {age}
                        </span>
                    </div>
                </div>

                <Button className="w-full mt-2 font-semibold bg-lime-600 hover:bg-lime-700 dark:bg-lime-700 dark:hover:bg-lime-800 text-white h-8">
                    <Link
                        href={
                            lostPet
                                ? `/mascotas-perdidas/${id}`
                                : `/adoptar/${id}`
                        }
                        className="flex items-center gap-1 w-full justify-center"
                    >
                        {lostPet ? "Ver mascota" : "Adoptar"}
                    </Link>
                </Button>
            </div>
        </article>
    );
}
