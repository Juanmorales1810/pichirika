"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
}

export default function CardPetAdoption(props: CardPetAdoptionProps) {
    const {
        title,
        image,
        ubication,
        id,
        skeleton,
        species = "Mascota",
        age = "Desconocida",
    } = props;
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    if (skeleton) {
        return (
            <article className="flex flex-col min-w-40 max-w-48 bg-lime-50 dark:bg-lime-800 rounded-2xl p-3 border-2 border-lime-700 dark:border-lime-400">
                <div className="aspect-square w-full bg-lime-200 dark:bg-lime-700 animate-pulse rounded-xl" />
                <div className="p-2 space-y-2">
                    <div className="h-5 w-3/4 bg-lime-200 dark:bg-lime-700 animate-pulse rounded-md" />
                    <div className="h-4 w-1/2 bg-lime-200 dark:bg-lime-700 animate-pulse rounded-md" />
                    <div className="h-4 w-3test/4 bg-lime-200 dark:bg-lime-700 animate-pulse rounded-md" />
                    <div className="h-8 w-full bg-lime-200 dark:bg-lime-700 animate-pulse rounded-md mt-2" />
                </div>
            </article>
        );
    }

    return (
        <article className="flex flex-col min-w-40 max-w-48 bg-lime-50 dark:bg-lime-800 rounded-2xl p-3 border-2 border-lime-700 dark:border-lime-400 hover:shadow-md transition-shadow">
            <div className="relative">
                <Link href={`/adopt/${id}`} className="block">
                    <Image
                        className="rounded-xl aspect-square object-cover"
                        src={image || "/placeholder.svg"}
                        alt={title}
                        width={200}
                        height={200}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute top-1 right-1 h-7 w-7 rounded-full bg-lime-100/80 dark:bg-lime-700/80 backdrop-blur-sm hover:bg-lime-200 dark:hover:bg-lime-600 ${
                            isFavorite
                                ? "text-red-500"
                                : "text-lime-700 dark:text-lime-300"
                        }`}
                        onClick={toggleFavorite}
                    >
                        <Heart
                            className={`h-4 w-4 ${
                                isFavorite ? "fill-red-500" : ""
                            }`}
                        />
                        <span className="sr-only">Añadir a favoritos</span>
                    </Button>
                </Link>
            </div>

            <div className="p-1 pt-2">
                <div className="flex justify-between items-start mb-1">
                    <h3
                        className={`text-lg font-bold line-clamp-1 ${fontMono.className}`}
                    >
                        {title}
                    </h3>
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

                <Button className="w-full mt-2 font-semibold bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600 text-white h-8">
                    <Link
                        href={`/adoptar/${id}`}
                        className="flex items-center gap-1 w-full justify-center"
                    >
                        Adoptar
                    </Link>
                </Button>
            </div>
        </article>
    );
}
