import Link from "next/link";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fontMono } from "@/config/fonts";

interface RegisterPetCTAProps {
    registerUrl?: string;
}

export default function RegisterPetCTA({
    registerUrl = "/register-pet",
}: RegisterPetCTAProps) {
    return (
        <article className="flex flex-col min-w-40 max-w-48 bg-lime-50 dark:bg-lime-950 rounded-2xl p-3 border-2 border-dashed border-lime-700 dark:border-lime-700 hover:shadow-md transition-shadow">
            <div className="relative">
                <div className="rounded-xl bg-lime-100 dark:bg-lime-700/50 flex items-center justify-center overflow-hidden">
                    <div className="flex items-end justify-center py-3">
                        <PlusCircle className="h-12 w-12 text-lime-700 dark:text-lime-300" />
                    </div>
                </div>
            </div>

            <div className="p-1 pt-3 flex flex-col items-center text-center">
                <h3
                    className={`text-lg font-bold ${fontMono.className} text-lime-800 dark:text-lime-200 mb-1`}
                >
                    ¿Tienes una mascota para dar en adopción?
                </h3>

                <p className="text-xs text-lime-700 dark:text-lime-300 mb-3">
                    Ayúdanos a encontrar un hogar para tu mascota registrándola
                    en nuestra plataforma
                </p>

                <Button className="w-full font-semibold bg-lime-600 hover:bg-lime-700 dark:bg-lime-700 dark:hover:bg-lime-800 text-white h-8">
                    <Link
                        href={registerUrl}
                        className="flex items-center gap-1 w-full justify-center"
                    >
                        <PlusCircle className="h-4 w-4" />
                        Registrar mascota
                    </Link>
                </Button>
            </div>
        </article>
    );
}
