export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "PichiriKa",
    description:
        "Un portal web para la adopción y cuidado de animales es una plataforma virtual que facilita la conexión entre mascotas necesitadas de hogar y personas interesadas en brindarles amor y cuidados. Ofrece perfiles detallados de animales disponibles, información sobre cuidados básicos y salud, citas para visitar refugios, sistemas de donaciones y foros comunitarios. Promueve la adopción responsable y el bienestar animal.",
    navItems: [
        {
            label: "Info",
            href: "/info",
        },
        {
            label: "Blog",
            href: "/blog",
        },
        {
            label: "Adoptar",
            href: "/adopt",
        },
    ],
    navMenuItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Info",
            href: "/info",
        },
        {
            label: "Blog",
            href: "/blog",
        },
        {
            label: "Adoptar",
            href: "/adopt",
        },
    ],
    links: {
        github: "https://github.com/nextui-org/nextui",
        twitter: "https://twitter.com/getnextui",
        docs: "https://nextui.org",
        discord: "https://discord.gg/9b6yyZKmH4",
        sponsor: "https://patreon.com/jrgarciadev",
    },
};
