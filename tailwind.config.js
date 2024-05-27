import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [
        nextui({
            themes: {
                dark: {
                    colors: {
                        success: {
                            DEFAULT: "#14532d",
                            foreground: "#ffffff",
                        },
                        focus: "#14532d",
                    },
                },
                light: {
                    colors: {
                        success: {
                            DEFAULT: "#bef264",
                            foreground: "#000000",
                        },
                        focus: "#a3e635",
                    },
                },
            },
        }),
    ],
};
