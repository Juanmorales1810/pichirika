"use client";

import { FacebookLogo, GoogleLogo } from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "@/validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@/hooks/useLoading";
import { Button } from "@nextui-org/button";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { fontMono } from "@/config/fonts"
import useStore from "@/context/store";
import Link from "next/link";
import clsx from "clsx";

type Inputs = {
    correo: string;
    password: string;
};


export default function Login() {
    const { finishLoading, isLoading, startLoading } = useLoading()
    // const [isMounted, setIsMounted] = useState(false); // Estado para controlar si el componente está montado

    // const searchParams = useSearchParams(); // Obtenemos los parámetros de consulta

    // const { clearUser } = useStore((state) => state);

    // useEffect(() => {
    //     // Cuando el componente esté montado, activamos el estado
    //     setIsMounted(true);
    // }, []);

    // useEffect(() => {
    //     // Asegurarnos que estamos en el lado del cliente y que el componente está montado
    //     if (isMounted && searchParams.get('clearUser')) {
    //         clearUser();
    //     }
    // }, [isMounted, searchParams, clearUser]);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
    });

    const Fetch = useFetch()

    const onSubmit = handleSubmit(async (data) => {
        startLoading()
        await Fetch({
            endpoint: 'auth/login',
            redirectRoute: '/adopt',
            formData: data,
            method: 'POST'
        })
        finishLoading()
    })


    return (
        <div className="flex flex-col justify-center items-center md:justify-center h-full min-h-[calc(100vh-64px)] gap-2 px-2 pb-5">
            <h1 className={clsx("text-2xl pt-4 text-center font-extrabold ", fontMono.className)}>Al iniciar sesión podrás tener un mayor manejo control sobre las adopciones</h1>
            <p className={clsx("text-md pb-4 text-center font-extrabold ", fontMono.className)}>Esto es recomendado para refugios, rescatistas y veterinarias</p>
            <form onSubmit={onSubmit} className="flex flex-col items-center gap-2 md:w-full md:max-w-md">

                <Input
                    classNames={{
                        inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                    }}
                    id="correo"
                    type="email"
                    label="Correo electrónico"
                    {...register("correo")}
                    isInvalid={!!errors.correo}
                    errorMessage={errors.correo?.message}
                />
                <Input
                    classNames={{
                        inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                    }}
                    id="password"
                    type="password"
                    label="Contraseña"
                    {...register("password")}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                />
                <div className="w-full flex justify-between">
                    <Link className="text-blue-600 hover:text-blue-500 transition-colors" href="/adopt/forgetpassword">Recuperar contraseña</Link>
                    <Link className="text-blue-600 hover:text-blue-500 transition-colors" href="/adopt/register">Crear usuario</Link>
                </div>
                <Button
                    color="success"
                    variant="shadow"
                    className={clsx(
                        "text-xl mt-4 text-zinc-950 dark:text-zinc-100  font-bold ",
                        fontMono.className
                    )}
                    type="submit"
                    isLoading={isLoading}>Iniciar sesión</Button>
            </form>
            <p className={clsx("text-sm text-center font-extrabold ", fontMono.className)}>O puedes iniciar sesión con</p>
            <div className="w-full flex justify-center items-center gap-4">
                <Button
                    className={clsx(
                        "text-xl text-zinc-950 dark:text-zinc-100  font-bold ",
                        fontMono.className
                    )}
                    color="success"
                    variant="shadow"
                    endContent={<GoogleLogo />}
                    isLoading={isLoading}>Google</Button>
                <Button
                    className={clsx(
                        "text-xl text-zinc-950 dark:text-zinc-100  font-bold ",
                        fontMono.className
                    )}
                    color="success"
                    variant="shadow"
                    endContent={<FacebookLogo />}
                    isLoading={isLoading}>Facebook</Button>
            </div>
        </div>
    );
}