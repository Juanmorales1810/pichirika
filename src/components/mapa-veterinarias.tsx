import React, { useState, useEffect } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    useMap,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";

type Veterinaria = {
    nombre: string;
    lat: number;
    lon: number;
};

interface MapaVeterinariasProps {
    veterinarias?: Veterinaria[];
    lat: number | null;
    lon: number | null;
}

const MapaVeterinarias = (props: MapaVeterinariasProps) => {
    const { veterinarias, lat, lon } = props;
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
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}>
            <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Map
                    defaultCenter={center}
                    defaultZoom={15.5}
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                    style={{ height: "100%", width: "100%" }}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                >
                    {veterinarias?.map((veterinaria, index) => (
                        <AdvancedMarker
                            key={veterinaria.nombre}
                            position={{
                                lat: veterinaria.lat,
                                lng: veterinaria.lon,
                            }}
                            title={veterinaria.nombre}
                            onClick={() => handleVeterinariaClick(veterinaria)}
                        >
                            <div>
                                <img
                                    src="https://pichirika.vercel.app/pichirika-dot.png"
                                    alt="Marker"
                                    width={32}
                                    height={32}
                                />
                            </div>
                        </AdvancedMarker>
                    ))}

                    {lat && lon && (
                        <AdvancedMarker position={center}>
                            <div
                                style={{
                                    backgroundColor: "#4285F4",
                                    borderRadius: "50%",
                                    width: "16px",
                                    height: "16px",
                                    border: "2px solid white",
                                    zIndex: 2000,
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
