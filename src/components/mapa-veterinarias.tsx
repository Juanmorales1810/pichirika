import React, { useState, useEffect } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    useMap,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";
import useGeolocation from "@/hooks/useLocation";

type Veterinaria = {
    nombre: string;
    lat: number;
    lon: number;
};

const MapaVeterinarias = ({
    veterinarias,
}: {
    veterinarias: Veterinaria[];
}) => {
    const { lat, lon } = useGeolocation();
    const [selectedVeterinaria, setSelectedVeterinaria] =
        useState<Veterinaria | null>(null);

    const center = {
        lat: lat ?? 0,
        lng: lon ?? 0,
    };

    const handleVeterinariaClick = (veterinaria: Veterinaria) => {
        console.log(`Veterinaria seleccionada: ${veterinaria.nombre}`);
        setSelectedVeterinaria(veterinaria);
    };

    function Directions({
        origin,
        destination,
    }: {
        origin: string;
        destination: string;
    }) {
        const map = useMap();
        const routesLibrary = useMapsLibrary("routes");
        const [directionsService, setDirectionsService] =
            useState<google.maps.DirectionsService>();
        const [directionsRenderer, setDirectionsRenderer] =
            useState<google.maps.DirectionsRenderer>();

        useEffect(() => {
            if (!routesLibrary || !map) return;

            // Crear instancias de servicio y renderizador de direcciones
            const service = new routesLibrary.DirectionsService();
            const renderer = new routesLibrary.DirectionsRenderer({
                map,
                preserveViewport: false, // Permite que se ajuste la vista automáticamente
            });

            setDirectionsService(service);
            setDirectionsRenderer(renderer);
        }, [routesLibrary, map]);

        useEffect(() => {
            if (!directionsService || !directionsRenderer || !map) return;

            directionsService
                .route({
                    origin,
                    destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                })
                .then((response) => {
                    directionsRenderer.setDirections(response);

                    // Ajustar el mapa para mostrar toda la ruta
                    if (response.routes[0]?.bounds) {
                        map.fitBounds(response.routes[0].bounds);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching directions:", error);
                });

            return () => {
                directionsRenderer.setMap(null);
            };
        }, [origin, destination, directionsService, directionsRenderer, map]);

        return null;
    }

    return (
        <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
            libraries={["routes"]}
        >
            <div className="relative w-full h-full">
                <Map
                    defaultCenter={center} // Asignación del centro por defecto
                    defaultZoom={15.5} // Cambiado a defaultZoom para permitir navegación
                    style={{
                        height: "calc(100% + 25px)",
                        width: "calc(100% + 25px)",
                    }}
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                    disableDefaultUI={true} // Deshabilitar UI por defecto
                    gestureHandling="greedy" // Permitir interacción completa
                    mapTypeControl={false} // Deshabilitar selector de tipo de mapa
                >
                    {/* Marcadores de veterinarias */}
                    {veterinarias.map((veterinaria, index) => (
                        <AdvancedMarker
                            key={veterinaria.nombre}
                            position={{
                                lat: veterinaria.lat,
                                lng: veterinaria.lon,
                            }}
                            title={veterinaria.nombre}
                            onClick={() => handleVeterinariaClick(veterinaria)}
                            zIndex={100 / (index + 1)}
                        >
                            <img
                                src="https://pichirika.vercel.app/pichirika-dot.png"
                                alt="Marker"
                                width={32}
                                height={32}
                            />
                        </AdvancedMarker>
                    ))}

                    {/* Ubicación del usuario */}
                    {lat && lon && (
                        <AdvancedMarker position={center} zIndex={1000}>
                            <div
                                style={{
                                    backgroundColor: "#4285F4",
                                    borderRadius: "50%",
                                    width: "16px",
                                    height: "16px",
                                    border: "2px solid white",
                                }}
                            />
                        </AdvancedMarker>
                    )}

                    {selectedVeterinaria && lat && lon && (
                        <Directions
                            origin={`${lat},${lon}`}
                            destination={`${selectedVeterinaria.lat},${selectedVeterinaria.lon}`}
                        />
                    )}
                </Map>
            </div>
        </APIProvider>
    );
};

export default MapaVeterinarias;
