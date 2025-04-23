"use client";

import { useState, useEffect } from "react";
import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import useGeolocation from "@/hooks/useLocation";
import { LoaderCircleIcon } from "lucide-react";
import { SliderWithTicks } from "@/components/SilederTicks";

interface MascotaPerdida {
    id: string;
    petName: string;
    description: string;
    lat: number;
    lng: number;
    lostDate: string;
    image: string;
}

// Componente para crear el círculo usando la API nativa de Google Maps
function MapCircle({
    center,
    radius,
    options,
}: {
    center: google.maps.LatLngLiteral;
    radius: number;
    options?: google.maps.CircleOptions;
}) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        // Crear el círculo usando la API nativa de Google Maps
        const circle = new google.maps.Circle({
            map,
            center,
            radius,
            fillColor: "#bbf451",
            fillOpacity: 0.3,
            strokeColor: "#365314",
            strokeOpacity: 0.6,
            strokeWeight: 4,
            ...options,
        });

        // Limpiar el círculo cuando el componente se desmonte
        return () => {
            circle.setMap(null);
        };
    }, [map, center, radius, options]);

    return null;
}

const MapaMascotasPerdidas = () => {
    const {
        lat,
        lon,
        error: locationError,
        loading: locationLoading,
    } = useGeolocation();
    const [mascotasPerdidas, setMascotasPerdidas] = useState<MascotaPerdida[]>(
        []
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchRadius, setSearchRadius] = useState(2000);
    const [isSearching, setIsSearching] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const fetchMascotasCercanas = async () => {
            if (lat && lon) {
                try {
                    setIsSearching(true);
                    const response = await fetch(
                        `/api/get-lost-pets-coor?lat=${lat}&lng=${lon}&radius=${searchRadius}`
                    );
                    if (!response.ok)
                        throw new Error("Error al obtener mascotas cercanas");
                    const data = await response.json();
                    setMascotasPerdidas(data.items);
                } catch (err) {
                    setError(
                        err instanceof Error ? err.message : "Error desconocido"
                    );
                } finally {
                    setIsSearching(false);
                }
            }
            setLoading(false);
        };

        if (isMounted) {
            fetchMascotasCercanas();
        }
    }, [lat, lon, searchRadius, isMounted]);

    if (locationLoading || loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircleIcon className="animate-spin h-12 w-12 text-lime-500" />
                <span className="ml-3">Cargando mapa...</span>
            </div>
        );
    }

    if (locationError || error) {
        return (
            <div className="container mx-auto pt-20 pb-13">
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">
                        {locationError?.message || error}
                    </span>
                </div>
            </div>
        );
    }

    const ubicacionUsuario = {
        lat: lat ?? 19.4326, // Ubicación por defecto si no hay geolocalización
        lng: lon ?? -99.1332,
    };

    return (
        <div className="container mx-auto pt-20 pb-13" suppressHydrationWarning>
            <h1 className="text-2xl font-bold mb-4" suppressHydrationWarning>
                Mascotas Perdidas Cercanas
            </h1>

            <SliderWithTicks
                min={500}
                max={10000}
                step={500}
                value={searchRadius}
                onChange={setSearchRadius}
                tickStep={1500}
                tickFormatter={(value) => `${value / 1000}km`}
                label="Radio de búsqueda"
                className="my-4 "
            />

            <div className="relative h-[65vh] w-full rounded-lg overflow-hidden shadow-lg">
                {isSearching && (
                    <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 z-10">
                        <LoaderCircleIcon className="animate-spin h-12 w-12 text-lime-500" />
                        <span className="ml-3">Buscando mascotas...</span>
                    </div>
                )}

                {/* Mapa de Google con el círculo y los marcadores */}
                <APIProvider
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
                >
                    <Map
                        defaultCenter={ubicacionUsuario}
                        defaultZoom={13}
                        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                        style={{ height: "100%", width: "100%" }}
                        gestureHandling={"greedy"}
                        disableDefaultUI={true}
                        renderingType="RASTER"
                    >
                        {/* Usar el componente de círculo nativo */}
                        {isMounted && (
                            <MapCircle
                                center={ubicacionUsuario}
                                radius={searchRadius}
                            />
                        )}

                        {/* Marcador de la ubicación del usuario */}
                        <Marker
                            position={ubicacionUsuario}
                            title="Tu ubicación"
                            icon={{
                                path: "M 0 0 m -8, 0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0",
                                fillColor: "#4285F4",
                                fillOpacity: 1,
                                strokeColor: "#FFFFFF",
                                strokeWeight: 2,
                                scale: 1,
                            }}
                        />

                        {/* Marcadores de mascotas perdidas */}
                        {mascotasPerdidas.map((mascota) => (
                            <Marker
                                key={mascota.id}
                                position={{
                                    lat: Number(mascota.lat),
                                    lng: Number(mascota.lng),
                                }}
                                title={mascota.petName}
                                onClick={() => {
                                    alert(
                                        `${mascota.petName}\n${mascota.description}\nPerdido el: ${mascota.lostDate}`
                                    );
                                }}
                            />
                        ))}
                    </Map>
                </APIProvider>
            </div>
        </div>
    );
};

export default MapaMascotasPerdidas;
