"use client";

// import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { useFetch } from "@/hooks/useFetch";
import { useSearchParams } from 'next/navigation'
import { useLoading } from "@/hooks/useLoading";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { Link } from "@nextui-org/link";
import React from "react";
import { AxiosRequestConfig } from "axios";


export default function ForgetPassword() {
    const [isVisible, setIsVisible] = React.useState(false);
    const { finishLoading, isLoading, startLoading } = useLoading()

    const toggleVisibility = () => setIsVisible(!isVisible);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const searchParams = useSearchParams()
    const authFetch = useFetch()

    const onSubmit = handleSubmit(async (formData) => {
        const token = searchParams.get('token')
        const options: AxiosRequestConfig<any> = {
            headers: {
                token
            }
        }
        startLoading()
        await authFetch({
            endpoint: 'auth/change-password',
            redirectRoute: '/guard',
            formData,
            options
        })
        finishLoading()
    });
    return (
        <div className="h-96 max-w-md gap-4 w-full justify-center items-center p-4 bg-slate-200 rounded-xl z-50">
            <h1 className="text-black text-left text-2xl font-bold pb-10">
                Recuperar contraseña
            </h1>
            <form
                className="h-auto max-w-md flex flex-col gap-4 w-full justify-center items-center pb-4"
                onSubmit={onSubmit}
            >
                <Input
                    type={isVisible ? "text" : "password"}
                    label="Nueva contraseña"
                    required
                    {...register("newPassword", {
                        required: {
                            value: true,
                            message: "Contraseña es requerida",
                        },
                        minLength: {
                            value: 8,
                            message: "Contraseña debe tener al menos 8 caracteres",
                        },
                        maxLength: { value: 20, message: "Contraseña debe tener menos de 20 caracteres" },
                        validate: {
                            hasLowerCase: value => /[a-z]/.test(value) || "La contraseña debe tener al menos una letra minúscula",
                            hasUpperCase: value => /[A-Z]/.test(value) || "La contraseña debe tener al menos una letra mayúscula",
                            hasNumber: value => /\d/.test(value) || "La contraseña debe tener al menos un número",
                            hasSpecialCharacter: value => /[@$!%*#?&]/.test(value) || "La contraseña debe tener al menos un carácter especial",
                        },
                    })}
                    isInvalid={!!errors.newPassword}
                    errorMessage={
                        errors.newPassword && `${errors.newPassword.message}`
                    }

                />
                <Input
                    type={isVisible ? "text" : "password"}
                    label="Repertir contraseña"
                    required
                    {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: "Contraseña es requerida",
                        },
                        validate: (value) =>
                            value === watch("newPassword") || "Las contraseñas no coinciden",
                    })}
                    isInvalid={!!errors.confirmPassword}
                    errorMessage={
                        errors.confirmPassword && `${errors.confirmPassword.message}`
                    }
                />
                <Button color="primary" variant="shadow" type="submit" isLoading={isLoading}>
                    Enviar contraseña
                </Button>
            </form>
            <p className="text-slate-600 text-sm text-center pt-4">
                Te perdiste?{" "}
                <Link size="sm" href="../guard">
                    Volver
                </Link>
            </p>
        </div>
    )
}