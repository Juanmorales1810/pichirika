import { useState, useEffect } from "react";

interface GeolocationState {
    lat: number | null;
    lon: number | null;
    error: GeolocationPositionError | null;
    loading: boolean;
}

const useGeolocation = (): GeolocationState => {
    const [state, setState] = useState<GeolocationState>({
        lat: null,
        lon: null,
        error: null,
        loading: true,
    });

    useEffect(() => {
        // Evitar ejecutar nuevamente si ya tenemos los datos
        if (state.lat !== null && state.lon !== null && !state.loading) {
            return;
        }

        if (!navigator.geolocation) {
            setState((prev) => ({
                ...prev,
                error: {
                    code: 0,
                    message:
                        "La geolocalización no es compatible con este navegador.",
                    PERMISSION_DENIED: 1,
                    POSITION_UNAVAILABLE: 2,
                    TIMEOUT: 3,
                },
                loading: false,
            }));
            return;
        }

        const onSuccess = (position: GeolocationPosition) => {
            console.log("Ubicación obtenida:", position.coords);
            setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                error: null,
                loading: false,
            });
        };

        const onError = (error: GeolocationPositionError) => {
            console.error("Error al obtener ubicación:", error);
            setState((prev) => ({
                ...prev,
                error,
                loading: false,
            }));
        };

        // Opciones para la geolocalización
        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
        };

        // Usar getCurrentPosition en lugar de watchPosition
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

        // No hay necesidad de retornar una función de limpieza ya que
        // getCurrentPosition no crea un id de watch que necesite ser limpiado
    }, []);

    return state;
};

export default useGeolocation;
