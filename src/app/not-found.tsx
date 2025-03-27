import { fontMono } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <h1 className={`text-6xl font-bold mb-4 ${fontMono.className}`}>
                404
            </h1>
            <h2 className="text-2xl font-semibold mb-2">
                Página no encontrada
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                No pudimos encontrar la página que estás buscando
            </p>
            <div className="w-full max-w-md h-60 relative mb-8">
                {/* Puedes añadir una imagen o ilustración aquí */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        className="rounded-xl"
                        src="/404.webp"
                        alt="error"
                        width={200}
                        height={200}
                    />
                </div>
            </div>
            <Link
                href="/"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
