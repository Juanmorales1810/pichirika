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
                    <div className="w-full space-y-2">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
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
                                    className="border-primary/20 bg-primary/5 py-3"
                                >
                                    <CardContent className="px-3">
                                        <div className="flex items-start gap-2">
                                            <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <div>
                                                <h3
                                                    className={`text-base font-bold ${fontMono.className}`}
                                                >
                                                    {veterinaria.nombre}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    A{" "}
                                                    <span className="font-semibold text-foreground">
                                                        {veterinaria.distancia}m
                                                    </span>{" "}
                                                    de distancia
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            <Card className="border-primary/20 bg-primary/5 py-3 border-2 border-dashed">
                                <CardContent className="px-3">
                                    <div className="flex items-center gap-2">
                                        <Plus className="h-5 w-5 text-primary shrink-0" />
                                        <div>
                                            <h3
                                                className={`text-base font-bold ${fontMono.className}`}
                                            >
                                                Quieres agregar una veterinaria?
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                Clickea aquí para agregar una
                                                veterinaria
                                            </p>
                                        </div>
                                    </div>
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

    // Caso por defecto: No hay ubicación y no hay error (esto no debería ocurrir normalmente)
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
