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
            setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                error: null,
                loading: false,
            });
        };

        const onError = (error: GeolocationPositionError) => {
            setState((prev) => ({
                ...prev,
                error,
                loading: false,
            }));
        };

        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }, []);

    return state;
};

export default useGeolocation;
