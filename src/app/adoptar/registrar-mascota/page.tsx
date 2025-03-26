"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { useLoading } from "@/hooks/useLoading";
import { useFetch } from "@/hooks/useFetch";
import { nombresAnimales } from "@/config/nombre";
import { mappedDepartment, petSchema } from "@/validations/registerPetSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CloudUpload, Loader2 } from "lucide-react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

type FormValues = z.infer<typeof petSchema>;

export default function Register() {
    const [name, setName] = useState<string>("");
    const { finishLoading, isLoading, startLoading } = useLoading();
    const Fetch = useFetch();

    const form = useForm<FormValues>({
        resolver: zodResolver(petSchema),
        defaultValues: {
            name: "",
            department: undefined,
            street1: "",
            street2: "",
            description: "",
            isHomeless: true,
        },
    });

    const isHomeless = form.watch("isHomeless");

    const generateName = () => {
        const randomIndex = Math.floor(Math.random() * nombresAnimales.length);
        const newName = nombresAnimales[randomIndex];
        setName(newName);
        form.setValue("name", newName);
    };

    const onSubmit = async (data: FormValues) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("department", data.department);
        formData.append("street1", data.street1);
        formData.append("street2", data.street2 || "");
        formData.append("description", data.description || "");
        formData.append("isHomeless", String(data.isHomeless));

        const imageFile = data.image;
        if (imageFile && imageFile[0]) {
            formData.append("image", imageFile[0]);
        }

        if (!data.isHomeless) {
            formData.append("telephone", data.telephone || "");
            formData.append("namecontact", data.namecontact || "");
        }

        for (const [key, value] of Array.from(formData.entries())) {
            console.log(`${key}: ${value}`);
        }

        startLoading();
        await Fetch({
            endpoint: "registerpet",
            redirectRoute: "/adoptar",
            formData: formData,
            method: "POST",
        });
        finishLoading();
    };

    return (
        <section className="flex flex-col justify-start md:justify-center h-full min-h-[calc(100vh-64px)] gap-2 px-2 pb-5 pt-20">
            <Card className="mx-auto p-4 border border-primary/10 rounded-md shadow-md">
                <CardHeader className="flex flex-col items-center justify-center text-2xl font-semibold">
                    Registro de animales en adopción
                </CardHeader>
                <CardDescription className="text-sm text-muted-foreground text-center mb-4">
                    Ayúdanos a encontrar un hogar para tu mascota registrándola
                    en nuestra plataforma
                </CardDescription>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col items-center gap-4 md:w-full md:max-w-md mx-auto"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <div className="relative flex w-full items-center">
                                            <Input
                                                placeholder="Nombre"
                                                className={cn(
                                                    "bg-primary/5",
                                                    form.formState.errors
                                                        .name &&
                                                        "ring-destructive/20 dark:ring-destructive/40 border-destructive focus-visible:ring-destructive/20 bg-destructive/10 text-destructive"
                                                )}
                                                {...field}
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                    field.onChange(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            <Badge
                                                variant="outline"
                                                className="absolute right-6 cursor-pointer hover:bg-primary/10 transition-colors select-none"
                                                onClick={generateName}
                                            >
                                                Generar nombre
                                            </Badge>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger
                                                className={cn(
                                                    "bg-primary/5 w-full",
                                                    form.formState.errors
                                                        .department &&
                                                        "ring-destructive/20 dark:ring-destructive/40 border-destructive focus-visible:ring-destructive/20 bg-destructive/10 text-destructive"
                                                )}
                                            >
                                                <SelectValue placeholder="Departamento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(
                                                    mappedDepartment
                                                ).map(([key, value]) => (
                                                    <SelectItem
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="street1"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="Calle 1"
                                            className="bg-primary/5"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="street2"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="Calle 2"
                                            className="bg-primary/5"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Textarea
                                            placeholder="Descripción"
                                            className="bg-primary/5 min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({
                                field: { value, onChange, ...fieldProps },
                            }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="dropzone-file"
                                                className={cn(
                                                    "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer",
                                                    form.formState.errors.image
                                                        ? "border-destructive bg-destructive/10 dark:bg-destructive/20 dark:border-destructive hover:bg-destructive/10 dark:hover:border-destructive"
                                                        : "border-zinc-300 bg-zinc-50 dark:hover:bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500"
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        "flex flex-col items-center justify-center pt-5 pb-6",
                                                        form.formState.errors
                                                            .image
                                                            ? "text-destructive"
                                                            : "text-zinc-500 dark:text-zinc-400"
                                                    )}
                                                >
                                                    <CloudUpload className="h-10 w-10" />
                                                    {value &&
                                                    value.length > 0 ? (
                                                        <>
                                                            <p className="mb-2 text-sm font-semibold">
                                                                Imagen
                                                                seleccionada
                                                            </p>
                                                            <p className="text-sm">
                                                                {value[0].name}
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="mb-2 text-sm">
                                                                <span className="font-semibold">
                                                                    Click para
                                                                    subir una
                                                                    imagen
                                                                </span>{" "}
                                                                o saca una foto
                                                                desde el
                                                                teléfono
                                                            </p>
                                                            <p className="text-xs">
                                                                JPEG, PNG, JPG o
                                                                WEBP (MAX. 2MB)
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                                <Input
                                                    id="dropzone-file"
                                                    type="file"
                                                    accept="image/*;capture=camera"
                                                    className={cn(
                                                        "hidden",
                                                        form.formState.errors
                                                            .image &&
                                                            "border-destructive"
                                                    )}
                                                    onChange={(e) =>
                                                        onChange(e.target.files)
                                                    }
                                                    {...fieldProps}
                                                />
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isHomeless"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 w-full">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            ¿Esta en situación de calle?
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <div
                            className={cn(
                                "flex flex-col w-full gap-4 transition-all duration-300 overflow-hidden",
                                isHomeless
                                    ? "max-h-0 opacity-0"
                                    : "max-h-[200px] opacity-100 mt-4"
                            )}
                        >
                            <p className="text-sm text-center text-muted-foreground">
                                Si no está en situación de calle, ingrese un
                                teléfono de contacto y su nombre para que los
                                interesados puedan comunicarse.
                            </p>

                            <FormField
                                control={form.control}
                                name="telephone"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                placeholder="Teléfono"
                                                type="tel"
                                                className="bg-primary/5"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="namecontact"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                placeholder="Nombre de contacto"
                                                className="bg-primary/5"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-32 mt-4 font-bold font-mono text-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Enviando
                                </>
                            ) : (
                                "Registrar"
                            )}
                        </Button>
                    </form>
                </Form>
            </Card>
        </section>
    );
}
