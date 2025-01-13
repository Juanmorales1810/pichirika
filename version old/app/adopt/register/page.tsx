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
import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";
import { FacebookLogo, GoogleLogo } from "@/components/icons";

type Inputs = {
    correo: string;
    password: string;
    repeatepassword: string;
    name: string;
    lastName: string;
    phone: string;
    itsRefuge: boolean;
    refugeteTelephone: string;
    refugeteName: string;
};


export default function Login() {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const { finishLoading, isLoading, startLoading } = useLoading()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(registerSchema),
    });

    const Fetch = useFetch()

    const onSubmit = handleSubmit(async (data) => {
        startLoading()
        await Fetch({
            endpoint: 'auth/register',
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
                    id="correo"
                    type="email"
                    placeholder="Correo electrónico"
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
                    placeholder="Contraseña"
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
                    placeholder="Repetir contraseña"
                    {...register("repeatepassword")}
                    isInvalid={!!errors.repeatepassword}
                    errorMessage={errors.repeatepassword?.message}
                />
                <Input
                    classNames={{
                        inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                    }}
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    {...register("name")}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                />
                <Input
                    classNames={{
                        inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                    }}
                    id="lastName"
                    type="text"
                    placeholder="Apellido"
                    {...register("lastName")}
                    isInvalid={!!errors.lastName}
                    errorMessage={errors.lastName?.message}
                />
                <Input
                    classNames={{
                        inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                    }}
                    id="phone"
                    type="number"
                    placeholder="Teléfono"
                    {...register("phone")}
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
                />
                <Checkbox
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                    color="success"
                    id="itsRefuge"
                    {...register("itsRefuge")}
                >
                    ¿Sos parte de un refugio?
                </Checkbox>
                <div className={clsx(
                    `flex flex-col justify-center items-center p-1 h-full gap-2 transition-[opacity_height] duration-500 delay-500 ease-in-out overflow-hidden`,
                    !isSelected ? "opacity-0 max-h-0" : "opacity-100 max-h-[200px]",
                )}>
                    <p className="text-sm text-center">
                        Si sos parte de un refugio, ingrese un teléfono de contacto y su nombre para que los interesados puedan comunicarse.
                    </p>

                    <Input
                        classNames={{
                            inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                        }}
                        id="refugeteTelephone"
                        type="tel"
                        placeholder="Teléfono del refugio"
                        {...register("refugeteTelephone")}
                        isInvalid={!!errors.refugeteTelephone}
                        errorMessage={errors.refugeteTelephone?.message}
                    />
                    <Input
                        classNames={{
                            inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                        }}
                        id="refugeteName"
                        type="text"
                        placeholder="Nombre de contacto"
                        {...register("refugeteName")}
                        isInvalid={!!errors.refugeteName}
                        errorMessage={errors.refugeteName?.message}
                    />
                </div>
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
                    isLoading={isLoading}>Crear usuario</Button>
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