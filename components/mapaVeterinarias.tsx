import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import useGeolocation from '@/hooks/useLocation';

type Veterinaria = {
    nombre: string;
    lat: number;
    lon: number;
};

const MapaVeterinarias = ({ veterinarias }: { veterinarias: Veterinaria[] }) => {
    const { lat, lon } = useGeolocation();
    const [selectedVeterinaria, setSelectedVeterinaria] = useState<Veterinaria | null>(null);
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [directionsServiceActive, setDirectionsServiceActive] = useState<boolean>(false);

    const mapContainerStyle = {
        height: "100%",
        width: "100%",
    };

    const center = {
        lat: lat ?? 0,
        lng: lon ?? 0
    };
    const handleVeterinariaClick = (veterinaria: Veterinaria) => {
        console.log(`Veterinaria seleccionada: ${veterinaria.nombre}`);
        setSelectedVeterinaria(veterinaria);
        setDirectionsResponse(null); // Clear previous directions
        setDirectionsServiceActive(true); // Activate DirectionsService for the new selection
    };

    const directionsCallback = (response: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
        console.log('Directions callback status:', status);
        if (status === 'OK' && response) {
            console.log('Directions response received');
            setDirectionsResponse(response);
            setDirectionsServiceActive(false); // Deactivate DirectionsService after receiving response
        } else {
            console.error('Error fetching directions', response);
            setDirectionsServiceActive(false); // Deactivate DirectionsService in case of error
        }
    };

    // Only request directions if a new veterianria is selected
    useEffect(() => {
        if (selectedVeterinaria && lat && lon) {
            console.log('Ready to request directions...');
            setDirectionsServiceActive(true); // Enable DirectionsService to make the request
        }
    }, [selectedVeterinaria, lat, lon]);
    return (
        <LoadScript googleMapsApiKey="AIzaSyAcyybGF_nvmxoVvN4V3BZ6meekjSrTpxE">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={13}
                options={{
                    disableDefaultUI: true, // Desactiva todos los controles predeterminados del mapa
                    scaleControl: false, // Activa el control de la barra de escala
                    styles: [
                        {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [
                                { color: "#193341" }
                            ]
                        },
                        {
                            featureType: "landscape",
                            elementType: "geometry",
                            stylers: [
                                { color: "#09090b" }
                            ]
                        },
                        {
                            featureType: "road",
                            elementType: "geometry",
                            stylers: [
                                { color: "#27272a" } // Oculta iconos de carretera como peajes, estaciones de servicio, etc.
                            ]
                        },
                        {
                            featureType: "poi",
                            stylers: [
                                { visibility: "off" } // Oculta puntos de interés como tiendas, restaurantes, etc.
                            ]
                        },
                        {
                            featureType: "transit",
                            elementType: "labels.icon",
                            stylers: [
                                { visibility: "off" } // Oculta iconos de transporte público
                            ]
                        },
                        {
                            featureType: "road",
                            elementType: "labels.icon",
                            stylers: [
                                { visibility: "off" } // Oculta iconos de carretera como peajes, estaciones de servicio, etc.
                            ]
                        },
                        {
                            featureType: "administrative",
                            elementType: "labels.text.fill",
                            stylers: [
                                { color: "#ffffff" } // Cambia el color del texto administrativo (por ejemplo, el nombre de las ciudades)
                            ]
                        },
                        {
                            featureType: "administrative.locality",
                            elementType: "labels.text.fill",
                            stylers: [
                                { visibility: "off" } // Oculta el nombre de las localidades (ciudades, pueblos, etc.)
                            ]
                        },
                        {
                            featureType: "administrative.neighborhood",
                            elementType: "labels.text.fill",
                            stylers: [
                                { visibility: "off" } // Oculta el nombre de los barrios
                            ]
                        }
                    ]
                }}
            >
                {veterinarias.map((veterinaria) => (
                    <Marker
                        key={veterinaria.nombre}
                        position={{ lat: veterinaria.lat, lng: veterinaria.lon }}
                        onClick={() => handleVeterinariaClick(veterinaria)}
                    >
                        {selectedVeterinaria === veterinaria && (
                            <InfoWindow
                                onCloseClick={() => setSelectedVeterinaria(null)}
                            >
                                <div>
                                    <h2 className='text-zinc-950 text-lg'>{veterinaria.nombre}</h2>
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                ))}
                {lat && lon && (
                    <Marker
                        position={center}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        }}
                    />
                )}
                {selectedVeterinaria && directionsServiceActive && (
                    <DirectionsService
                        options={{
                            destination: { lat: selectedVeterinaria.lat, lng: selectedVeterinaria.lon },
                            origin: { lat: lat!, lng: lon! },
                            travelMode: google.maps.TravelMode.DRIVING,
                        }}
                        callback={directionsCallback}
                    />
                )}
                {directionsResponse && (
                    <DirectionsRenderer
                        options={{
                            directions: directionsResponse
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapaVeterinarias;