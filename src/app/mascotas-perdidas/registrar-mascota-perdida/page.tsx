"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, CloudUpload, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import MapaFormulario from "@/components/mapa-formulario";
import {
    lostPetFormSchema,
    type LostPetFormValues,
    department,
    mappedDepartment,
} from "@/validations/lost-pet-schema";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { useLoading } from "@/hooks/useLoading";
import { useFetch } from "@/hooks/useFetch";

export default function LostPetFormPage() {
    const { finishLoading, isLoading, startLoading } = useLoading();
    const Fetch = useFetch();

    const form = useForm<LostPetFormValues>({
        resolver: zodResolver(lostPetFormSchema),
        defaultValues: {
            petName: "",
            description: "",
            lostDate: "",
            department: undefined,
            lat: "",
            lng: "",
            ownerName: "",
            phoneNumber: "",
            canCall: false,
            canWhatsapp: false,
        },
    });

    const handleLocationSelect = (lat: number, lng: number) => {
        form.setValue("lat", lat.toString(), { shouldValidate: true });
        form.setValue("lng", lng.toString(), { shouldValidate: true });
    };

    async function onSubmit(values: LostPetFormValues) {
        const formData = new FormData();
        formData.append("petName", values.petName);
        formData.append("description", values.description);
        formData.append("lostDate", values.lostDate);
        formData.append("department", values.department || "");
        formData.append("lat", values.lat);
        formData.append("lng", values.lng);
        formData.append("ownerName", values.ownerName);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("canCall", values.canCall ? "true" : "false");
        formData.append("canWhatsapp", values.canWhatsapp ? "true" : "false");
        const image = form.getValues("image");
        if (image && image.length > 0) {
            formData.append("image", image[0]);
        }

        for (const [key, value] of Array.from(formData.entries())) {
            console.log(`${key}: ${value}`);
        }

        startLoading();
        await Fetch({
            endpoint: "register-lost-pets",
            redirectRoute: "/mascostas-perdidas",
            formData: formData,
            method: "POST",
        });
        finishLoading();
    }

    return (
        <div className="container mx-auto py-20 px-2">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Registro de Animal Perdido</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {/* Sección de datos del animal */}
                            <div>
                                <h2 className="text-lg font-semibold mb-4">
                                    Datos del Animal
                                </h2>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="petName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Nombre del animal
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nombre del animal"
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
                                            <FormItem>
                                                <FormLabel>
                                                    Descripción
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe el animal (raza, color, tamaño, características distintivas, etc.)"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lostDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>
                                                    Fecha en que se perdió
                                                </FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={
                                                                    "outline"
                                                                }
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value &&
                                                                        "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(
                                                                        new Date(
                                                                            field.value
                                                                        ),
                                                                        "PPP",
                                                                        {
                                                                            locale: es,
                                                                        }
                                                                    )
                                                                ) : (
                                                                    <span>
                                                                        Selecciona
                                                                        una
                                                                        fecha
                                                                    </span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className="w-auto p-0"
                                                        align="start"
                                                    >
                                                        <Calendar
                                                            mode="single"
                                                            selected={
                                                                field.value
                                                                    ? new Date(
                                                                          field.value
                                                                      )
                                                                    : undefined
                                                            }
                                                            onSelect={(
                                                                date
                                                            ) => {
                                                                if (date) {
                                                                    field.onChange(
                                                                        date
                                                                            .toISOString()
                                                                            .split(
                                                                                "T"
                                                                            )[0]
                                                                    );
                                                                }
                                                            }}
                                                            disabled={(date) =>
                                                                date >
                                                                new Date()
                                                            }
                                                            initialFocus
                                                            locale={es}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="department"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Departamento
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Selecciona un departamento" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="z-[1000]">
                                                        {department.map(
                                                            (dep) => (
                                                                <SelectItem
                                                                    key={dep}
                                                                    value={dep}
                                                                >
                                                                    {
                                                                        mappedDepartment[
                                                                            dep
                                                                        ]
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({
                                            field: {
                                                value,
                                                onChange,
                                                ...fieldProps
                                            },
                                        }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>
                                                    Imagen del animal
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center justify-center w-full">
                                                        <label
                                                            htmlFor="dropzone-file"
                                                            className={cn(
                                                                "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer",
                                                                form.formState
                                                                    .errors
                                                                    .image
                                                                    ? "border-destructive bg-destructive/10 dark:bg-destructive/20 dark:border-destructive hover:bg-destructive/10 dark:hover:border-destructive"
                                                                    : "border-zinc-300 bg-zinc-50 dark:hover:bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500"
                                                            )}
                                                        >
                                                            <div
                                                                className={cn(
                                                                    "flex flex-col items-center justify-center pt-5 pb-6",
                                                                    form
                                                                        .formState
                                                                        .errors
                                                                        .image
                                                                        ? "text-destructive"
                                                                        : "text-zinc-500 dark:text-zinc-400"
                                                                )}
                                                            >
                                                                <CloudUpload className="h-10 w-10" />
                                                                {value &&
                                                                value.length >
                                                                    0 ? (
                                                                    <>
                                                                        <p className="mb-2 text-sm font-semibold">
                                                                            Imagen
                                                                            seleccionada
                                                                        </p>
                                                                        <p className="text-sm">
                                                                            {
                                                                                value[0]
                                                                                    .name
                                                                            }
                                                                        </p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="mb-2 text-sm text-center">
                                                                            <span className="font-semibold">
                                                                                Click
                                                                                para
                                                                                subir
                                                                                una
                                                                                imagen
                                                                            </span>{" "}
                                                                            o
                                                                            saca
                                                                            una
                                                                            foto
                                                                            desde
                                                                            el
                                                                            teléfono
                                                                        </p>
                                                                        <p className="text-xs">
                                                                            JPEG,
                                                                            PNG,
                                                                            JPG
                                                                            o
                                                                            WEBP
                                                                            (MAX.
                                                                            5MB)
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
                                                                    form
                                                                        .formState
                                                                        .errors
                                                                        .image &&
                                                                        "border-destructive"
                                                                )}
                                                                onChange={(e) =>
                                                                    onChange(
                                                                        e.target
                                                                            .files
                                                                    )
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
                                </div>
                            </div>

                            <Separator />

                            {/* Sección de ubicación */}
                            <div>
                                <h2 className="text-lg font-semibold mb-4">
                                    Ubicación donde se perdió
                                </h2>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <FormLabel>
                                            Selecciona la ubicación en el mapa
                                        </FormLabel>
                                        <div className="border rounded-md overflow-hidden">
                                            <MapaFormulario
                                                onLocationSelect={
                                                    handleLocationSelect
                                                }
                                            />
                                        </div>
                                        <FormDescription className="flex items-center space-x-2 text-sm text-muted-foreground gap-1.5">
                                            <Info className="size-8 text-muted-foreground" />
                                            Haz clic en el mapa para seleccionar
                                            la ubicación donde se perdió el
                                            animal, esto ayudara a otros
                                            usuarios a localizar a otros
                                            animales perdidos en la misma zona.
                                        </FormDescription>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="lat"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="hidden">
                                                        Latitud
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="hidden"
                                                            readOnly
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="lng"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="hidden">
                                                        Longitud
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="hidden"
                                                            readOnly
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Sección de datos del dueño */}
                            <div>
                                <h2 className="text-lg font-semibold mb-4">
                                    Datos de Contacto
                                </h2>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="ownerName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Nombre completo
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Tu nombre completo"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Número de teléfono
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        placeholder="Ej: 2645123456"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex flex-col space-y-2">
                                        <FormLabel>
                                            Preferencias de contacto
                                        </FormLabel>
                                        <div className="flex space-x-4">
                                            <FormField
                                                control={form.control}
                                                name="canCall"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={
                                                                    field.value
                                                                }
                                                                className="border-lime-500 data-[state=checked]:border-lime-500 data-[state=checked]:bg-lime-500 transition-colors"
                                                                onCheckedChange={
                                                                    field.onChange
                                                                }
                                                            />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel>
                                                                Se puede llamar
                                                            </FormLabel>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="canWhatsapp"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={
                                                                    field.value
                                                                }
                                                                className="border-lime-500 data-[state=checked]:border-lime-500 data-[state=checked]:bg-lime-500 transition-colors"
                                                                onCheckedChange={
                                                                    field.onChange
                                                                }
                                                            />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel>
                                                                Se puede enviar
                                                                WhatsApp
                                                            </FormLabel>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-4 font-bold [font-family:var(--font-mono)] text-xl"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Enviando
                                    </>
                                ) : (
                                    "Registrar Animal Perdido"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
