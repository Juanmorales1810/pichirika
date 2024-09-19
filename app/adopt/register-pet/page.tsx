"use client";

import { userSchema, mappedDepartment } from "@/validations/registerPetSchema";
import { Select, SelectItem } from "@nextui-org/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { nombresAnimales } from "@/config/nombre";
import { Checkbox } from "@nextui-org/checkbox";
import { useLoading } from "@/hooks/useLoading";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useFetch } from "@/hooks/useFetch";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { fontMono } from "@/config/fonts"
import { Chip } from "@nextui-org/chip";
import { useState } from "react";
import clsx from "clsx";

type Inputs = {
    name: string;
    department: string;
    street1: string;
    street2: string;
    description: string;
    image: object;
    isHomeless: boolean;
    telephone: string;
    namecontact: string;
};


export default function Register() {
    const [name, setName] = useState<string>("");
    const [isSelected, setIsSelected] = useState<boolean>(true);
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

    const onSubmit = handleSubmit(async ({ name, department, street1, street2, description, isHomeless, telephone, namecontact }) => {
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
        if (!isHomeless) {
            formData.append("telephone", telephone);
            formData.append("namecontact", namecontact);
        }

        for (let [key, value] of Array.from(formData.entries())) {
            console.log(`${key}: ${value}`);
        }

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
        <div className="flex flex-col justify-start md:justify-center h-full min-h-[calc(100vh-64px)] gap-2 px-2 pb-5">
            <h1 className={"text-2xl py-4 text-center font-extrabold " + fontMono.className}>Registro de animales en adopción</h1>
            <form onSubmit={onSubmit} className="flex flex-col items-center gap-2 md:w-full md:max-w-md">
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
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                    color="success"
                    id="isHomeless"
                    {...register("isHomeless")}
                >
                    ¿Esta en situación de calle?
                </Checkbox>
                <div className={clsx(
                    `flex flex-col justify-center items-center p-1 h-full gap-2 transition-[opacity_height] duration-500 delay-500 ease-in-out overflow-hidden`,
                    isSelected ? "opacity-0 max-h-0" : "opacity-100 max-h-[200px]",
                )}>
                    <p className="text-sm text-center">
                        Si no está en situación de calle, ingrese un teléfono de contacto y su nombre para que los interesados puedan comunicarse.
                    </p>

                    <Input
                        classNames={{
                            inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                        }}
                        id="telephone"
                        type="tel"
                        placeholder="Teléfono"
                        {...register("telephone")}
                        isInvalid={!!errors.telephone}
                        errorMessage={errors.telephone?.message}
                    />
                    <Input
                        classNames={{
                            inputWrapper: "bg-lime-100 dark:bg-green-950 shadow-md",
                        }}
                        id="namecontact"
                        type="text"
                        placeholder="Nombre de contacto"
                        {...register("namecontact")}
                        isInvalid={!!errors.namecontact}
                        errorMessage={errors.namecontact?.message}
                    />
                </div>
                <Button color="success" variant="shadow" className={"text-xl w-32 mt-4 text-zinc-950 dark:text-zinc-100  font-bold " + fontMono.className} type="submit" isLoading={isLoading}>Registrar</Button>
            </form>
        </div>
    );
}

