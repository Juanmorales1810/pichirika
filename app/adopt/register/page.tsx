"use client";

import { userSchema, mappedDepartment } from "@/validations/userSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { nombresAnimales } from "@/config/nombre";
import { Checkbox } from "@nextui-org/checkbox";
import { useLoading } from "@/hooks/useLoading";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useFetch } from "@/hooks/useFetch";
import { Input } from "@nextui-org/input";
import { fontMono } from "@/config/fonts"
import { Chip } from "@nextui-org/chip";
import { useState } from "react";

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
    const { finishLoading, isLoading, startLoading } = useLoading()

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(userSchema),
    });

    const Fetch = useFetch()

    const generateName = () => {
        const randomIndex = Math.floor(Math.random() * nombresAnimales.length);
        const newName = nombresAnimales[randomIndex];
        setName(newName);
        setValue("name", newName);
    };

    const onSubmit = handleSubmit(async ({ name, department, street1, street2, description, isHomeless }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("department", department);
        formData.append("street1", street1);
        formData.append("street2", street2);
        formData.append("description", description);
        formData.append("isHomeless", String(isHomeless));
        const imageFile = watch('image') as FileList;
        if (imageFile && imageFile[0]) {
            formData.append("image", imageFile[0]);
        }
        console.log(formData.get("name"));
        console.log(formData.get("department"));
        console.log(formData.get("street1"));
        console.log(formData.get("street2"));
        console.log(formData.get("description"));
        console.log(formData.get("isHomeless"));
        console.log(formData.get("image"));

        startLoading()
        await Fetch({
            endpoint: 'registerpet',
            redirectRoute: '/adopt',
            formData: formData,
            method: 'POST'
        })
        finishLoading()
    })


    return (
        <div className="flex flex-col justify-start md:justify-center h-[calc(100vh-64px)] gap-2">
            <h1 className={"text-2xl py-4 font-extrabold " + fontMono.className}>Registro de animales en adopción</h1>
            <form onSubmit={onSubmit} className="flex flex-col items-center gap-2">
                <Input
                    classNames={{
                        inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                    }}
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    isRequired
                    value={name}
                    {...register("name")}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    endContent={
                        <Chip onClick={generateName} color="success" className="text-xs text-zinc-950 font-semibold dark:text-zinc-400 cursor-pointer select-none">
                            Generar nombre
                        </Chip>
                    }
                    onChange={(e) => {
                        setName(e.target.value);
                        setValue("name", e.target.value);
                    }}
                />
                <Select
                    classNames={{
                        trigger: "bg-lime-100 dark:bg-green-950 shadow-md",
                        popoverContent: "bg-lime-100 dark:bg-green-950",
                    }}
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
                    classNames={{
                        inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                    }}
                    id="street1"
                    type="text"
                    placeholder="Calle 1"
                    {...register("street1")}
                    isInvalid={!!errors.street1}
                    errorMessage={errors.street1?.message}
                />
                <Input
                    classNames={{
                        inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                    }}
                    id="street2"
                    type="text"
                    placeholder="Calle 2"
                    {...register("street2")}
                    isInvalid={!!errors.street2}
                    errorMessage={errors.street2?.message}
                />
                <Textarea
                    classNames={{
                        inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                    }}
                    id="description"
                    placeholder="Descripción"
                    {...register("description")}
                />
                <div className="flex flex-col w-full ">
                    <input
                        className={`text-default-500 block w-full file:py-2 file:px-4 file:font-light file:rounded-lg file:border-0 file:border-solid ${errors.image ? "file:bg-danger-50 dark:file:bg-danger-50" : "file:bg-lime-300 shadow-md rounded-xl bg-lime-100 dark:file:bg-green-900 dark:bg-green-950"} file:outline-none file:transition-all file:duration-200 file:ease-in-out`}
                        id="image"
                        accept="image/*;capture=camera"
                        type="file"
                        {...register("image")}
                    />
                    {errors.image?.message && <p className="text-start text-xs text-danger-500 dark:text-danger-400 p-1">{errors.image?.message}</p>}
                </div>
                <Checkbox
                    color="success"
                    id="isHomeless"
                    {...register("isHomeless")}
                >
                    ¿Esta en situación de calle?
                </Checkbox>
                <Button color="success" variant="shadow" className={"text-xl w-32 mt-4 text-zinc-950 dark:text-zinc-100  font-bold " + fontMono.className} type="submit" isLoading={isLoading}>Registrar</Button>
            </form>
        </div>
    );
}

