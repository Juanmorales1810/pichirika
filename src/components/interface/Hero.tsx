import React from "react";
import { AlertIcon, CallIcon, Logo, PetIcon } from "../icons";
import { fontMono } from "@/config/fonts";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="flex flex-col items-center justify-center gap-4">
            <div className="relative flex w-full h-full min-h-[100dvh] justify-center items-center overflow-hidden">
                <div className="flex flex-col justify-between items-center gap-4 w-full max-w-6xl z-20 md:flex-row">
                    <div className="flex flex-col justify-center items-center w-auto h-[40vh]">
                        <Logo className="fill-zinc-950 dark:fill-zinc-300 transition-[fill] ease-in-out duration-700 w-52 h-52 md:w-80 md:h-80" />
                        <h1
                            className={
                                "font-[900] text-4xl text-center mb-0 sm:text-7xl text-zinc-950 dark:text-zinc-200 transition-colors ease-in-out duration-700 [font-family:var(--font-mono)]"
                            }
                        >
                            PichiriKa
                        </h1>
                    </div>
                    <div className="flex flex-col justify-center items-center max-w-xl px-2 md:items-start">
                        <h2
                            className={
                                "font-bold text-3xl md:text-4xl mb-4 " +
                                fontMono.className
                            }
                        >
                            ¿Qué es PichiriKa?
                        </h2>
                        <p className=" text-base md:text-lg text-center font-medium text-pretty mb-3 md:text-start">
                            Es un portal web para la adopción y cuidado de
                            animales es una plataforma virtual que facilita la
                            conexión entre mascotas necesitadas de hogar y
                            personas interesadas en brindarles amor y cuidados.
                            Ofrece perfiles detallados de animales disponibles,
                            información sobre cuidados básicos y salud, citas
                            para visitar refugios, sistemas de donaciones y
                            foros comunitarios. Promueve la adopción responsable
                            y el bienestar animal.
                        </p>
                        <div className="flex gap-4 mb-2">
                            <Button
                                asChild
                                className="font-semibold bg-green-600 hover:bg-green-700"
                            >
                                <Link
                                    href="/adoptar"
                                    className="flex items-center gap-2"
                                >
                                    <PetIcon className="fill-white" />
                                    Adopta
                                </Link>
                            </Button>
                            <Button
                                color="danger"
                                className="bg-red-700 font-semibold text-white dark:bg-red-900 hover:bg-red-800 dark:hover:bg-red-800"
                            >
                                <Link
                                    href="tel:4213280"
                                    className="flex items-center gap-2"
                                >
                                    <CallIcon className="fill-zinc-200" />
                                    Denuncia
                                </Link>
                            </Button>
                        </div>
                        <div className="flex gap-1 items-center my-2">
                            <AlertIcon className="stroke-red-600" size={14} />
                            <small className="text-red-600">
                                Las llamadas de denuncia solo son para la
                                provincia de&nbsp;<strong>San Juan</strong>
                            </small>
                        </div>
                    </div>
                </div>
                <div className="absolute w-full h-[62vh] rounded-t-[112px] dark:h-[50vh] dark:rounded-b-[112px] dark:rounded-t-none top-[47%] dark:top-0 md:dark:h-screen md:top-0 md:h-screen bg-lime-100 z-10 md:dark:rounded-full md:rounded-full md:dark:top-0 md:left-[40%] dark:bg-green-950 md:dark:-left-[50%] transition-[color_left] ease-in-out duration-700"></div>
                {/* <footer className="absolute top-[94%] w-full flex items-center justify-center py-3 z-50">
					<Link
						className="flex items-center gap-1 text-current"
						href="https://portfolio-astro-tan.vercel.app/"
						title="Portfolio de Juan Morales"
						target="_blank"
					>
						<span className="text-default-600">Hecho con 💖 por</span>
						<p className="text-primary">Juan Morales.</p>
					</Link>
				</footer> */}
            </div>
        </section>
    );
}
