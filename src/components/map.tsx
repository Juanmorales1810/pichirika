"use client";

import React, { useEffect } from "react";
import {
    APIProvider,
    Map,
    useMap,
} from "@vis.gl/react-google-maps";

// Componente para crear el círculo usando la API de Google Maps
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
            fillColor: "#4285F4",
            fillOpacity: 0.3,
            strokeColor: "#4285F4",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            ...options,
        });

        // Limpiar el círculo cuando el componente se desmonte
        return () => {
            circle.setMap(null);
        };
    }, [map, center, radius, options]);

    return null;
}

interface MapaProps {
    lat: number;
    lng: number;
    radius?: number; // Radio opcional en metros
}

const Mapa = (props: MapaProps) => {
    const { lat, lng, radius = 1000 } = props;

    // Definir el centro del mapa, utilizando San Juan como fallback
    const mapCenter = { lat, lng };

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}>
            <div className="relative w-full h-52 rounded-xl overflow-hidden">
                <Map
                    defaultCenter={mapCenter}
                    defaultZoom={13}
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                    style={{ height: "100%", width: "100%" }}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    renderingType="RASTER"
                >
                    {/* Usar nuestro componente personalizado para el círculo */}
                    <MapCircle center={mapCenter} radius={radius} />
                </Map>
            </div>
        </APIProvider>
    );
};

export default Mapa;
