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

function Directions({ origin, destination }: { origin: string; destination: string }) {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);

    useEffect(() => {
        if (!routesLibrary || !map) return;

        const service = new routesLibrary.DirectionsService();
        const renderer = new routesLibrary.DirectionsRenderer({
            map,
            draggable: false,
            preserveViewport: false,
            suppressMarkers: true
        });

        setDirectionsService(service);
        setDirectionsRenderer(renderer);

        return () => {
            renderer.setMap(null);
        };
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer || !map) return;

        directionsService
            .route({
                origin,
                destination,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);

                // Ajustar el mapa para mostrar toda la ruta
                if (response.routes[0]?.bounds) {
                    map.fitBounds(response.routes[0].bounds);
                }
            })
            .catch(error => {
                console.error("Error al obtener direcciones:", error);
            });
    }, [directionsService, directionsRenderer, origin, destination, map]);

    useEffect(() => {
        if (!directionsRenderer || !routes[routeIndex] || !map) return;
        directionsRenderer.setRouteIndex(routeIndex);

        // Ajustar el mapa cuando se cambia la ruta
        if (routes[routeIndex]?.bounds) {
            map.fitBounds(routes[routeIndex].bounds);
        }
    }, [routeIndex, directionsRenderer, routes, map]);

    return null;
}

const MapaVeterinarias = ({ veterinarias }: { veterinarias: Veterinaria[] }) => {
    const { lat, lon } = useGeolocation();
    const [selectedVeterinaria, setSelectedVeterinaria] = useState<Veterinaria | null>(null);

    const center = {
        lat: lat ?? 0,
        lng: lon ?? 0,
    };

    const handleVeterinariaClick = (veterinaria: Veterinaria) => {
        setSelectedVeterinaria(veterinaria);
    };

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}>
            <Map
                style={{ position: 'relative', width: '100vw', height: '100vh' }}
                defaultCenter={center}
                defaultZoom={15.5}
                mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
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
        </APIProvider>
    );
};

export default MapaVeterinarias;
