"use client";

import MapaVeterinarias from "./mapaVeterinarias";
import useGeolocation from "@/hooks/useLocation";
import { Spinner } from "@nextui-org/spinner";
import { fontMono } from "@/config/fonts";
import { getDistance } from "geolib";

const veterinarias = [
    { nombre: "Medipet Veterinaria", lat: -31.493481950286228, lon: -68.5319632754965 },
    { nombre: "Clinica veterinaria del Sol", lat: -31.521148265471556, lon: -68.51688716281036 },
    { nombre: "Veterinaria Pueblo Viejo", lat: -31.5208821501454, lon: -68.5200574994059 },
    { nombre: "Veterinaria Rioja", lat: -31.521595519248624, lon: -68.52385550737206 },
    { nombre: "Centro Veterinario Asis Vet", lat: -31.523168570328394, lon: -68.52449923753582 },
    { nombre: "Veterinaria VET365", lat: -31.524142568397274, lon: -68.52440553100139 },
    { nombre: "Municipio de la Capital - Centro de Zoonosis", lat: -31.529373632724905, lon: -68.51582246215118 },
    { nombre: "Clínica Veterinaria Dr. Ernesto Cortinez", lat: -31.53215365956675, lon: -68.5165091076592 },
    { nombre: "Veterinaria Tassara", lat: -31.53303154558594, lon: -68.51286130339787 },
    { nombre: "Instituto quirurgico veterinario", lat: -31.533251015801138, lon: -68.50638108641596 },
    { nombre: "Clínica Veterinaria Inca", lat: -31.535079914200743, lon: -68.50865559966125 },
    { nombre: "Clinica Veterinaria Alem", lat: -31.533616798346866, lon: -68.53208737762232 },
    { nombre: "Veterinaria Maskotitas", lat: -31.523228016575285, lon: -68.53629308135892 },
    { nombre: "Veterinaria San Antonio", lat: -31.541407626476566, lon: -68.51015763670885 },
    { nombre: "Veterinaria Seres", lat: -31.541846527012677, lon: -68.51839738280503 },
    { nombre: "Veterinaria San Francisco", lat: -31.541919676901387, lon: -68.51959901244408 },
    { nombre: "Baistrocchi Roberto Veterinaria", lat: -31.54261459798517, lon: -68.53444772155494 },
    { nombre: "Veterinaria Mayo", lat: -31.536898834943347, lon: -68.54337105202843 },
    { nombre: "Clínica Veterinaria San Martin de Porres", lat: -31.527241889178924, lon: -68.54908699809376 },
    { nombre: "Veterinaria El Retoño", lat: -31.51027622539929, lon: -68.54809407839123 },
    { nombre: "Clinica Veterinaria Central", lat: -31.537061395467134, lon: -68.55123963167487 },
    { nombre: "Mundo Equino Veterinaria", lat: -31.54407380291025, lon: -68.55275530075876 },
    { nombre: "Laboratorio Veterinario - Dra Natalia Herrera Manrique", lat: -31.543766252225787, lon: -68.54784741991571 },
    { nombre: "Clínica Veterinaria Las Marias", lat: -31.543889272621172, lon: -68.54250649076297 },
    { nombre: "Clínica Veterinaria Refugio de Abril", lat: -31.547395285727674, lon: -68.5272054504876 },
    { nombre: "Clínica Veterinaria Salud Animal", lat: -31.55865054281134, lon: -68.52374106401015 },
    { nombre: "Veterinaria Montilla", lat: -31.550962672641294, lon: -68.52107059943378 },
    { nombre: "El Arca", lat: -31.549425022590707, lon: -68.51998797865957 },
    { nombre: "Clínica Veterinaria Mundo Animal", lat: -31.542351506024982, lon: -68.52107059943378 },
    { nombre: "Santa Lucía Clínica Veterinaria", lat: -31.540875226258333, lon: -68.49804686430241 },
    { nombre: "Veterinaria EL EDÉN", lat: -31.541428833753407, lon: -68.49220071212808 },
    { nombre: "Veterinaria Mis Amigos", lat: -31.533001339721526, lon: -68.50021210585717 },
    { nombre: "VETERINARIA CLINICA PEQUES", lat: -31.520943164390303, lon: -68.50071732888513 },
    { nombre: "Veterinaria la Cucha de Enrique Morales Janavel", lat: -31.522704941443518, lon: -68.5557066885549 },
    { nombre: "Veterinaria Don Perro", lat: -31.525228146204384, lon: -68.56693443975465 },
    { nombre: "Clínica Veterinaria Olaen", lat: -31.51939856997176, lon: -68.56754686254736 },
    { nombre: "VETERINARIA ARAMBURU", lat: -31.51835442835375, lon: -68.56213712787839 },
    { nombre: "Medipet Veterinaria de Dra Herrera Nerina", lat: -31.509364600714353, lon: -68.57801267271182 },
    { nombre: "Clínica Veterinaria Nacusi", lat: -31.526486066306266, lon: -68.56462308530554 },
    { nombre: "Veterinaria Alem sucursal Rivadavia", lat: -31.526632390095603, lon: -68.57732602720385 },
    { nombre: "VETERINARIA RIVADAVIA", lat: -31.528095615381083, lon: -68.58899900084013 },
    { nombre: "Veterinaria TULUM", lat: -31.53175357830099, lon: -68.59346219664225 },
    { nombre: "Veterinaria Aisha", lat: -31.537020793181533, lon: -68.57406446104078 },
    { nombre: "Clínica Veterinaria Urbana", lat: -31.542580308748143, lon: -68.55689832334035 },
    { nombre: "Veterinaria Rivadavia", lat: -31.549894956346964, lon: -68.5629064715355 },
    { nombre: "Clinica Veterinaria Buena Pata", lat: -31.552528089137375, lon: -68.54848691586716 },
    { nombre: "Veterinaria Chipet", lat: -31.55647764899839, lon: -68.55809995297939 },
    { nombre: "Veterinaria España", lat: -31.56086585274473, lon: -68.5338956988218 },
    { nombre: "VETERINARIA VALKIRIA", lat: -31.56320614366787, lon: -68.5215360796775 },
    { nombre: "Veterinaria Del Sur", lat: -31.573151725348854, lon: -68.53784391049331 },
    { nombre: "Veterinaria El Lucero", lat: -31.5798790170306, lon: -68.5333807146912 },
    { nombre: "Veterinaria Buena Pata", lat: -31.582803775023756, lon: -68.5335523760682 },
    { nombre: "Quirófano Municipal de Mascotas Santa Lucía", lat: -31.547261749657725, lon: -68.47776242854187 },
    { nombre: "Clinica Veterinaria el Palenque", lat: -31.543311799708995, lon: -68.483255592606 },
    { nombre: "Hospital Veterinario Dr. Lucas Olivera", lat: -31.416404064307834, lon: -68.49360637350678 },
    { nombre: "Veterinaria La Taba", lat: -31.432562459321492, lon: -68.5217672118162 },
    { nombre: "Veterinaria Ischigualasto", lat: -31.542696691699906, lon: -68.59119824419973 },
    { nombre: "Veterinaria San Francisco", lat: -31.585721412603064, lon: -68.53827528944583 }
];

const VeterinariasCercanas = () => {
    const { lat, lon } = useGeolocation();

    if (lat && lon) {
        const veterinariasConDistancia = veterinarias.map((veterinaria) => {
            const distancia = getDistance(
                { latitude: lat, longitude: lon },
                { latitude: veterinaria.lat, longitude: veterinaria.lon }
            );
            return { ...veterinaria, distancia };
        });

        const veterinariasOrdenadas = veterinariasConDistancia.sort((a, b) => a.distancia - b.distancia);
        const veterinariasCercanas = veterinariasOrdenadas.slice(0, 5);

        return (
            <div className="flex flex-col gap-3 w-full h-full px-2">
                <ul className="flex flex-col flex-none gap-1 md:flex-row">
                    {veterinariasCercanas.map((veterinaria) => (
                        <li className="flex flex-col px-3 py-0.5 bg-lime-50 dark:bg-lime-800 rounded-lg border-2 border-lime-700 dark:border-lime-400" key={veterinaria.nombre}>
                            <h3 className={`text-base font-bold ${fontMono.className}`}>{veterinaria.nombre}</h3>
                            <p className="text-xs">Esta a&nbsp;<strong>{veterinaria.distancia}m</strong> de distancia</p>
                        </li>
                    ))}
                </ul>
                <div className="h-full rounded-xl overflow-hidden mb-2">
                    <MapaVeterinarias veterinarias={veterinariasCercanas} />
                </div>
            </div>
        );
    }

    return <div>
        <Spinner label="Cargando ubicación..." color="success" />
    </div>;
};

export default VeterinariasCercanas;