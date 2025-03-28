"use client";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { veterinarias } from "@/config/veterinarias";
import { LoaderCircle, MapPin, Plus } from "lucide-react";
import MapaVeterinarias from "./mapa-veterinarias";
import useGeolocation from "@/hooks/useLocation";
import { Card, CardContent } from "./ui/card";
import { fontMono } from "@/config/fonts";
import { Skeleton } from "./ui/skeleton";
import { getDistance } from "geolib";
import { Button } from "./ui/button";
import Link from "next/link";

const VeterinariasCercanas = () => {
    const { lat, lon, error, loading } = useGeolocation();

    if (loading) {
        return (
            <Card className="w-full">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                    <LoaderCircle className="animate-spin text-primary h-8 w-8" />
                    <p className="text-sm text-center text-muted-foreground">
                        Obteniendo tu ubicación...
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                    <Separator className="my-4" />
                    <Skeleton className="w-full h-[550px]" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="mx-auto max-w-md">
                <AlertTitle className="font-semibold">
                    No pudimos acceder a tu ubicación
                </AlertTitle>
                <AlertDescription className="mt-2">
                    <p className="text-sm mb-4">
                        {error.message ||
                            "Por favor permite el acceso a tu ubicación para ver veterinarias cercanas"}
                    </p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="w-full"
                    >
                        Reintentar
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (lat && lon) {
        const veterinariasConDistancia = veterinarias.map((veterinaria) => {
            const distancia = getDistance(
                { latitude: lat, longitude: lon },
                { latitude: veterinaria.lat, longitude: veterinaria.lon }
            );
            return { ...veterinaria, distancia };
        });

        const veterinariasOrdenadas = veterinariasConDistancia.sort(
            (a, b) => a.distancia - b.distancia
        );
        const veterinariasCercanas = veterinariasOrdenadas.slice(0, 5);

        return (
            <div className="flex flex-col gap-4 w-full">
                <Card>
                    <CardContent className="px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                            {veterinariasCercanas.map((veterinaria) => (
                                <Card
                                    key={veterinaria.nombre}
                                    className="py-3 border-2 bg-lime-50 dark:bg-lime-950 border-lime-700 dark:border-lime-700"
                                >
                                    <CardContent className="px-3">
                                        <div className="flex items-center gap-2 text-lime-700 dark:text-lime-300">
                                            <MapPin className="h-5 w-5 text-lime-700 dark:text-lime-300 shrink-0 mt-0.5" />
                                            <div>
                                                <h3
                                                    className={`text-base font-bold ${fontMono.className} line-clamp-1`}
                                                >
                                                    {veterinaria.nombre}
                                                </h3>
                                                <p className="text-xs text-lime-700 dark:text-lime-300">
                                                    A{" "}
                                                    <span className="font-semibold text-lime-900 dark:text-lime-200">
                                                        {veterinaria.distancia}m
                                                    </span>{" "}
                                                    de distancia
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            <Card className=" bg-lime-50 dark:bg-lime-950 border-lime-700 dark:border-lime-700 py-3 border-2 border-dashed">
                                <CardContent className="px-3">
                                    <Link
                                        target="_blank"
                                        href="https://forms.gle/fiFhKZL6fbCzcK1U9"
                                        className="flex items-center gap-2"
                                    >
                                        <Plus className="h-5 w-5 text-lime-700 dark:text-lime-300 shrink-0" />
                                        <div>
                                            <h3
                                                className={`text-base font-bold text-lime-700 dark:text-lime-300 ${fontMono.className}`}
                                            >
                                                Quieres agregar una veterinaria?
                                            </h3>
                                            <p className="text-xs text-lime-600 dark:text-lime-300">
                                                Clickea aquí para agregar una
                                                veterinaria
                                            </p>
                                        </div>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                        <Separator className="my-4" />
                        <div className="w-full h-[550px] rounded-lg overflow-hidden">
                            <MapaVeterinarias
                                veterinarias={veterinariasCercanas}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                <LoaderCircle className="animate-spin text-yellow-600 h-8 w-8" />
                <p className="text-sm text-center text-muted-foreground">
                    Esperando datos de ubicación...
                </p>
            </CardContent>
        </Card>
    );
};

export default VeterinariasCercanas;
