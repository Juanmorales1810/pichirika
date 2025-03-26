import {
    GoogleMap,
    LoadScript,
    DirectionsService,
    DirectionsRenderer,
    InfoWindow,
    useGoogleMap,
} from "@react-google-maps/api";
import React, { useEffect, useState, useRef } from "react";
import useGeolocation from "@/hooks/useLocation";
import { LoaderCircle } from "lucide-react";

type Veterinaria = {
    nombre: string;
    lat: number;
    lon: number;
};

// Componente para crear marcadores avanzados
const AdvancedMarker = ({
    position,
    title,
    onClick,
    isUserLocation = false,
    index = 0,
}: {
    position: google.maps.LatLngLiteral;
    title?: string;
    onClick?: () => void;
    isUserLocation?: boolean;
    index?: number;
}) => {
    const map = useGoogleMap();
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
        null
    );

    useEffect(() => {
        if (!map || !window.google) return;

        // Importar la biblioteca de marcadores avanzados
        const { AdvancedMarkerElement } = google.maps.marker;

        if (!AdvancedMarkerElement) {
            console.warn("AdvancedMarkerElement no está disponible");
            return;
        }

        // Crear el elemento del marcador
        let markerElement;
        if (isUserLocation) {
            // Marcador para ubicación del usuario
            markerElement = document.createElement("div");
            markerElement.className = "map-marker user-location";
            markerElement.innerHTML = `
                <div style="background-color: #4285F4; border-radius: 50%; width: 16px; height: 16px; border: 2px solid white;"></div>
            `;
        } else {
            // Marcador para veterinarias
            markerElement = document.createElement("div");
            markerElement.className = "map-marker veterinaria";
            markerElement.innerHTML = `
                <div style="position: relative;">
                    <img src="https://pichirika.vercel.app/pichirika-dot.png" alt="Marker" style="width: 24px; height: 24px;" />
                    ${
                        title
                            ? `<div style="position: absolute; top: 30px; left: 50%; transform: translateX(-50%); background-color: #65a30d; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; white-space: nowrap;">${title}</div>`
                            : ""
                    }
                </div>
            `;
        }

        // Crear el marcador avanzado
        const marker = new AdvancedMarkerElement({
            map,
            position,
            content: markerElement,
            zIndex: isUserLocation ? 1000 : 100 / (index + 1),
            title,
        });

        // Añadir evento de clic
        if (onClick) {
            marker.addListener("click", onClick);
        }

        markerRef.current = marker;

        return () => {
            // Limpiar el marcador cuando el componente se desmonte
            if (markerRef.current) {
                markerRef.current.map = null;
            }
        };
    }, [map, position, title, onClick, isUserLocation, index]);

    // Este componente no renderiza nada en sí mismo
    return null;
};

const MapaVeterinarias = ({
    veterinarias,
}: {
    veterinarias: Veterinaria[];
}) => {
    const { lat, lon } = useGeolocation();
    const [selectedVeterinaria, setSelectedVeterinaria] =
        useState<Veterinaria | null>(null);
    const [directionsResponse, setDirectionsResponse] =
        useState<google.maps.DirectionsResult | null>(null);
    const [directionsServiceActive, setDirectionsServiceActive] =
        useState<boolean>(false);

    const mapContainerStyle = {
        height: "calc(100% + 50px)",
        width: "calc(100% + 50px)",
    };

    const center = {
        lat: lat ?? 0,
        lng: lon ?? 0,
    };

    const handleVeterinariaClick = (veterinaria: Veterinaria) => {
        console.log(`Veterinaria seleccionada: ${veterinaria.nombre}`);
        setSelectedVeterinaria(veterinaria);
        setDirectionsResponse(null); // Clear previous directions
        setDirectionsServiceActive(true); // Activate DirectionsService for the new selection
    };

    const directionsCallback = (
        response: google.maps.DirectionsResult | null,
        status: google.maps.DirectionsStatus
    ) => {
        console.log("Directions callback status:", status);
        if (status === "OK" && response) {
            console.log("Directions response received");
            setDirectionsResponse(response);
            setDirectionsServiceActive(false); // Deactivate DirectionsService after receiving response
        } else {
            console.error("Error fetching directions", response);
            setDirectionsServiceActive(false); // Deactivate DirectionsService in case of error
        }
    };

    // Only request directions if a new veterianria is selected
    useEffect(() => {
        if (selectedVeterinaria && lat && lon) {
            console.log("Ready to request directions...");
            setDirectionsServiceActive(true); // Enable DirectionsService to make the request
        }
    }, [selectedVeterinaria, lat, lon]);
    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
            loadingElement={
                <div>
                    <LoaderCircle
                        className="animate-spin text-green-700"
                        size={32}
                    />
                    <p className="text-sm text-center">
                        Cargando veterinarias cercanas...
                    </p>
                </div>
            }
            id="google-maps-script"
            libraries={["marker"]} // Importante: Añadir la biblioteca de marcadores
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={13}
                options={{
                    mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID, // ID del mapa
                    disableDefaultUI: true, // Desactiva todos los controles predeterminados del mapa
                    scaleControl: false, // Activa el control de la barra de escala
                    styles: [
                        {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{ color: "#193341" }],
                        },
                        {
                            featureType: "landscape",
                            elementType: "geometry",
                            stylers: [{ color: "#09090b" }],
                        },
                        {
                            featureType: "road",
                            elementType: "geometry",
                            stylers: [
                                { color: "#27272a" }, // Oculta iconos de carretera como peajes, estaciones de servicio, etc.
                            ],
                        },
                        {
                            featureType: "poi",
                            stylers: [
                                { visibility: "off" }, // Oculta puntos de interés como tiendas, restaurantes, etc.
                            ],
                        },
                        {
                            featureType: "transit",
                            elementType: "labels.icon",
                            stylers: [
                                { visibility: "off" }, // Oculta iconos de transporte público
                            ],
                        },
                        {
                            featureType: "road",
                            elementType: "labels.icon",
                            stylers: [
                                { visibility: "off" }, // Oculta iconos de carretera como peajes, estaciones de servicio, etc.
                            ],
                        },
                        {
                            featureType: "administrative",
                            elementType: "labels.text.fill",
                            stylers: [
                                { color: "#ffffff" }, // Cambia el color del texto administrativo (por ejemplo, el nombre de las ciudades)
                            ],
                        },
                        {
                            featureType: "administrative.locality",
                            elementType: "labels.text.fill",
                            stylers: [
                                { visibility: "off" }, // Oculta el nombre de las localidades (ciudades, pueblos, etc.)
                            ],
                        },
                        {
                            featureType: "administrative.neighborhood",
                            elementType: "labels.text.fill",
                            stylers: [
                                { visibility: "off" }, // Oculta el nombre de los barrios
                            ],
                        },
                        {
                            featureType: "road",
                            elementType: "labels.text.fill",
                            stylers: [
                                { visibility: "off" }, // Oculta iconos de carretera como peajes, estaciones de servicio, etc.
                            ],
                        },
                    ],
                }}
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
                        index={index}
                    />
                ))}
                {lat && lon && (
                    <AdvancedMarker position={center} isUserLocation={true} />
                )}
                {/* El resto del código para DirectionsService y DirectionsRenderer sigue igual */}
                {selectedVeterinaria && directionsServiceActive && (
                    <DirectionsService
                        options={{
                            destination: {
                                lat: selectedVeterinaria.lat,
                                lng: selectedVeterinaria.lon,
                            },
                            origin: { lat: lat!, lng: lon! },
                            travelMode: google.maps.TravelMode.DRIVING,
                        }}
                        callback={directionsCallback}
                    />
                )}
                {directionsResponse && (
                    <DirectionsRenderer
                        options={{
                            directions: directionsResponse,
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapaVeterinarias;
