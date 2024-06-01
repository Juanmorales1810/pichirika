"use client";

import { useState, useEffect } from 'react';

const useGeolocation = () => {
    const [location, setLocation] = useState<{ lat: number | null, lon: number | null }>({ lat: null, lon: null });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error obteniendo la ubicación: ", error);
                }
            );
        } else {
            console.error("Geolocalización no está soportada por este navegador");
        }
    }, []);

    return location;
};

export default useGeolocation;