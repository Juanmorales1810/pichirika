import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    // URL base del sitio web
    const baseUrl = "https://www.pichirika.com/";

    // Fecha actual para last modified
    const currentDate = new Date();
    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/adoptar`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/adoptar/registrar-mascota`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/mascotas-perdidas`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/mascotas-perdidas/mapa-mascotas-perdidas`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/mascotas-perdidas/registrar-mascota-perdida`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/preguntas-frecuentes`,
            lastModified: currentDate,
            changeFrequency: "yearly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/veterinarias`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.9,
        },
    ];
}
