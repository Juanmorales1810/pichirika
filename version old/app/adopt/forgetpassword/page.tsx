"use client";

import { registerSchema } from "@/validations/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from "@/hooks/useLoading";
import { Button } from "@nextui-org/button";
import { useFetch } from "@/hooks/useFetch";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { fontMono } from "@/config/fonts"
import Link from "next/link";
import clsx from "clsx";

type Inputs = {
    correo: string;
    password: string;
    repeatepassword: string;
    name: string;
    fullname: string;
    phone: string;
};


export default function Login() {
    const { finishLoading, isLoading, startLoading } = useLoading()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registerSchema),
    });

    const Fetch = useFetch()

    const onSubmit = handleSubmit(async (data) => {
        startLoading()
        await Fetch({
            endpoint: 'auth/forgetpassword',
            redirectRoute: '/adopt',
            formData: data,
            method: 'POST'
        })
        finishLoading()
    })


    return (
        <div className="flex flex-col justify-center items-center md:justify-center h-full min-h-[calc(100vh-64px)] gap-2 px-2 pb-5">
            <h1 className={clsx("text-2xl pt-4 text-center font-extrabold ", fontMono.className)}>Al registrarte podrás tener un mayor manejo control sobre las adopciones</h1>
            <p className={clsx("text-md pb-4 text-center font-extrabold ", fontMono.className)}>Esto es recomendado para refugios, rescatistas y veterinarias</p>
            <form onSubmit={onSubmit} className="flex flex-col items-center gap-2 md:w-full md:max-w-md">

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
                <Input
                    classNames={{
                        inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                    }}
                    id="repeatepassword"
                    type="password"
                    label="Repetir contraseña"
                    {...register("repeatepassword")}
                    isInvalid={!!errors.repeatepassword}
                    errorMessage={errors.repeatepassword?.message}
                />
                <div className="w-full flex justify-between">
                    <Link className="text-blue-600 hover:text-blue-500 transition-colors" href="#">Soporte</Link>
                    <Link className="text-blue-600 hover:text-blue-500 transition-colors" href="/adopt/login">Iniciar sesión</Link>
                </div>
                <Button
                    color="success"
                    variant="shadow"
                    className={clsx(
                        "text-xl mt-4 text-zinc-950 dark:text-zinc-100  font-bold ",
                        fontMono.className
                    )}
                    type="submit"
                    isLoading={isLoading}>Actualizar contraseña</Button>
            </form>
        </div>
    );
}