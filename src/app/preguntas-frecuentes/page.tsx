import Mapa from "@/components/map";
import MapaVeterinarias from "@/components/mapa-veterinarias";
import React from "react";

export default function Page() {
    return (
        <div>
            <h1 className="text-5xl font-bold text-center">
                Preguntas Frecuentes
            </h1>
            <p className="text-lg text-center hidden md:block">
                Encuentra respuestas a las preguntas más comunes.
            </p>
            <div className="flex flex-col items-center justify-center w-full h-full max-w-6xl gap-2 pt-20 px-2">
                <h2 className="text-3xl font-bold">¿Cómo funciona la app?</h2>
                <p className="text-lg text-center">
                    La app utiliza la ubicación del usuario para mostrar
                    veterinarias cercanas y permitir la búsqueda de veterinarias
                    por nombre.
                </p>
            </div>
        </div>
    );
}
