"use client";

import { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import useGeolocation from "@/hooks/useLocation";

interface MascotaPerdida {
    id: string;
    petName: string;
    description: string;
    lat: number;
    lng: number;
    lostDate: string;
    image: string;
}

// Componente para el círculo del radio (renderizado solo en el cliente)
const SearchRadiusCircle = ({ radius }: { radius: number }) => {
    return (
        <div
            style={{
                position: "absolute",
                width: `${radius / 50}px`,
                height: `${radius / 50}px`,
                borderRadius: "50%",
                background: "rgba(66, 133, 244, 0.1)",
                border: "1px solid rgba(66, 133, 244, 0.4)",
                transform: "translate(-50%, -50%)",
                left: "50%",
                top: "50%",
                pointerEvents: "none",
            }}
        />
    );
};

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

    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRadius = parseInt(e.target.value);
        setSearchRadius(newRadius);
    };

    if (locationLoading || loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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

            <div className="mb-6" suppressHydrationWarning>
                <div
                    className="flex justify-between items-center mb-2"
                    suppressHydrationWarning
                >
                    <label
                        htmlFor="radius-slider"
                        className="font-medium text-sm"
                        suppressHydrationWarning
                    >
                        Radio de búsqueda:{" "}
                        <span className="font-bold">
                            {searchRadius / 1000} km
                        </span>
                    </label>
                    <span
                        className="text-sm text-gray-500"
                        suppressHydrationWarning
                    >
                        {mascotasPerdidas.length} mascotas encontradas
                    </span>
                </div>

                <div className="relative" suppressHydrationWarning>
                    <input
                        id="radius-slider"
                        type="range"
                        min="500"
                        max="10000"
                        step="500"
                        value={searchRadius}
                        onChange={handleRadiusChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        suppressHydrationWarning
                    />
                    {isSearching && (
                        <div
                            className="absolute -top-8 left-0 right-0 flex justify-center"
                            suppressHydrationWarning
                        >
                            <div
                                className="px-2 py-1 bg-blue-500 text-white text-xs rounded-md"
                                suppressHydrationWarning
                            >
                                Buscando...
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div
                className="h-[80vh] w-full rounded-lg overflow-hidden shadow-lg"
                suppressHydrationWarning
            >
                <APIProvider
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
                >
                    <Map
                        defaultCenter={ubicacionUsuario}
                        defaultZoom={13}
                        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                        style={{ height: "100%", width: "100%" }}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                    >
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

                        {/* Círculo que muestra el radio de búsqueda - solo del lado del cliente */}
                        {isMounted && (
                            <SearchRadiusCircle radius={searchRadius} />
                        )}

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
