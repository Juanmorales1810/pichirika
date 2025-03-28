import Link from "next/link";
import React from "react";

export default function Page() {
    return (
        <section className="container mx-auto flex flex-col items-center w-full h-full max-w-6xl gap-2 pt-20 px-2">
            <h1 className="text-5xl font-bold text-center">
                Animales Perdidos
            </h1>
            <p className="text-lg text-center hidden md:block">
                Encuentra animales perdidos en tu zona.
            </p>
            <p className="text-lg text-center hidden md:block">
                Si has perdido a tu mascota, puedes publicar su información
                aquí.
            </p>
            <p className="text-lg text-center hidden md:block">
                Si has encontrado un animal perdido, puedes ayudar a su dueño a
                encontrarlo.
            </p>
            <Link
                href="/animales-perdidos/registrar-animal-perdido"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Registrar Animal Perdido
            </Link>
        </section>
    );
}
