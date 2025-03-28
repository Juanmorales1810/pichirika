import React, { useState, useEffect } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    MapMouseEvent,
} from "@vis.gl/react-google-maps";
import useGeolocation from "../hooks/useLocation";

const MapaFormulario = ({
    onLocationSelect,
}: {
    onLocationSelect: (lat: number, lng: number) => void;
}) => {
    const [position, setPosition] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    // Obtener la ubicación actual del usuario
    const { lat, lon, loading, error } = useGeolocation();

    // Definir el centro del mapa, utilizando Santiago como fallback
    const mapCenter =
        lat && lon
            ? { lat, lng: lon }
            : { lat: -31.537147128549613, lng: -68.5250655450389 };
    // Cuando se obtiene la ubicación por primera vez, seleccionarla
    useEffect(() => {
        if (lat !== null && lon !== null && !loading && !position) {
            setPosition({ lat, lng: lon });
            onLocationSelect(lat, lon);
        }
    }, [lat, lon, loading, position, onLocationSelect]);

    // Manejar clic en el mapa
    const handleMapClick = (event: MapMouseEvent) => {
        if (event.detail && event.detail.latLng) {
            const lat = event.detail.latLng.lat;
            const lng = event.detail.latLng.lng;

            setPosition({ lat, lng });
            onLocationSelect(lat, lng);
        }
    };

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}>
            <div className="relative w-full h-full">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                        <p className="text-gray-700">
                            Obteniendo tu ubicación...
                        </p>
                    </div>
                )}

                <Map
                    defaultCenter={mapCenter}
                    defaultZoom={13}
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                    style={{ height: "400px", width: "100%" }}
                    disableDefaultUI={true}
                    onClick={handleMapClick}
                >
                    {position && (
                        <AdvancedMarker
                            position={position}
                            title="Ubicación seleccionada"
                        />
                    )}
                </Map>

                {error && (
                    <div className="mt-2 text-red-500 text-sm">
                        Error al obtener tu ubicación: {error.message}
                    </div>
                )}
            </div>
        </APIProvider>
    );
};

export default MapaFormulario;
