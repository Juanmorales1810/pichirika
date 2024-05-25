"use client";

import { userSchema, mappedDepartment } from "@/validations/userSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { nombresAnimales } from "@/config/nombre";
import { Checkbox } from "@nextui-org/checkbox";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { fontMono } from "@/config/fonts"
import { useState } from "react";
import { get } from "http";

type Inputs = {
    name: string;
    department: string;
    street1: string;
    street2: string;
    description: string;
    image: object;
    isHomeless: boolean;
};


export default function Register() {
    const [name, setName] = useState<string>("");
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(userSchema),
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };
    const generateName = () => {
        const randomIndex = Math.floor(Math.random() * nombresAnimales.length);
        const newName = nombresAnimales[randomIndex];  // Almacena el nuevo nombre en una variable
        setName(newName);  // Actualiza el estado del nombre
        setValue("name", newName);  // Actualiza el valor del campo "name" en react-hook-form
    }
    return (
        <div className="flex flex-col justify-start md:justify-center h-[calc(100vh-64px)] gap-2">
            <h1 className={"text-2xl py-4 font-extrabold " + fontMono.className}>Registro de animales en adopción</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-2">
                <Input
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    isRequired
                    value={name}
                    {...register("name")}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    endContent={
                        <Button onClick={() => generateName()} color="success" size="sm" className="text-xs text-zinc-950 font-semibold">
                            Generar nombre
                        </Button>
                    }
                    onChange={(e) => {
                        setName(e.target.value);  // Actualiza el estado del nombre cuando el usuario edita el campo de entrada
                        setValue("name", e.target.value);  // Actualiza el valor del campo "name" en react-hook-form
                    }}
                />
                <Select
                    id="department"
                    placeholder="Departamento"
                    {...register("department")}
                    isInvalid={!!errors.department}
                    errorMessage={errors.department?.message}
                    aria-label="Departamento"
                >
                    {Object.entries(mappedDepartment).map(([key, value]) => (
                        <SelectItem key={key} value={key} aria-label="Ciudad">
                            {value}
                        </SelectItem>
                    ))}
                </Select>
                <Input
                    id="street1"
                    type="text"
                    placeholder="Calle 1"
                    isRequired
                    {...register("street1")}
                    isInvalid={!!errors.street1}
                    errorMessage={errors.street1?.message}
                />
                <Input
                    id="street2"
                    type="text"
                    placeholder="Calle 2"
                    {...register("street2")}
                    isInvalid={!!errors.street2}
                    errorMessage={errors.street2?.message}
                />
                <Textarea
                    id="description"
                    type="text"
                    placeholder="Descripción"
                    {...register("description")}
                />
                <div className="flex flex-col w-full ">
                    <input
                        className={`text-default-500 block w-full file:py-2 file:px-4 file:font-light file:rounded-lg file:border-0 file:border-solid ${errors.image ? "file:bg-danger-50 dark:file:bg-danger-50" : "file:bg-default-100"} file:outline-none file:transition-all file:duration-200 file:ease-in-out`}
                        id="image"
                        accept="image/*;capture=camera"
                        placeholder="Image"
                        type="file"
                        {...register("image")}
                    />
                    {errors.image?.message && <p className="text-start text-xs text-danger-500 dark:text-danger-400 p-1">{errors.image?.message}</p>}
                </div>
                <Checkbox
                    id="isHomeless"
                    type="checkbox"
                    color="success"
                    {...register("isHomeless")}
                >
                    ¿Esta en situación de calle?
                </Checkbox>
                <Button color="success" className={"text-xl w-32 mt-4 text-zinc-950 font-bold " + fontMono.className} type="submit">Registrar</Button>
            </form>
        </div>
    )
}

