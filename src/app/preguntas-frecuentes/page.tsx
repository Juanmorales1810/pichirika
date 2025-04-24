import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FacebookIcon, GithubIcon, InstagramIcon } from "lucide-react";

const faqItems = [
    {
        id: "1",
        question: "¿Qué es esta aplicación?",
        answer: "Es un aplicación que ayuda a los animales a encontrar un hogar y a las personas a encontrar un amigo, tiene funcionalidades extras como ver las veterinarias mas cercanas por tu zona y también una sección de mascotas perdidas para que la comunidad pueda ayudarte a encontrar a tu mascota.",
    },
    {
        id: "2",
        question: "¿Cómo puedo adoptar un animal?",
        answer: "Puedes navegar por nuestra lista de animales disponibles y ponerte en contacto con la persona encargada de la adopción o visitar el lugar donde se encuentran el animal ya que puede que no esté en adopción directa.",
    },
    {
        id: "3",
        question: "¿Cómo puedo registar un animal?",
        answer: "Puedes registrarte en nuestra aplicación y luego ir a la sección de registro de animales. Allí podrás ingresar la información necesaria sobre el animal que deseas registrar.",
    },
    {
        id: "4",
        question: "¿Se guarda mi ubicación o algún dato personal?",
        answer: "No, no guardamos tu ubicación ni ningún dato personal. La aplicación solo utiliza tu ubicación temporalmente para mostrarte los animales y veterinarias cercanas.",
    },
    {
        id: "5",
        question: "¿Cómo puedo reportar un problema?",
        answer: "Puedes ponerte en contacto con nosotros a través de la sección de contacto en la aplicación o enviarnos un correo electrónico a nuestro soporte.",
    },
    {
        id: "6",
        question: "¿Es gratis usar esta aplicación?",
        answer: "Sí, la aplicación es completamente gratuita y siempre lo será.",
    },
    {
        id: "7",
        question: "¿Cómo puedo ayudar al proyecto?",
        answer: "Puedes ayudarnos compartiendo la aplicación con tus amigos y familiares, o incluso si tienes conocimientos de programación, puedes contribuir al código abierto del proyecto en GitHub.",
    },
];

export default function Page() {
    const items = faqItems;

    return (
        <section className="py-32">
            <div className="container mx-auto space-y-16 px-2">
                <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
                    <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-muted-foreground lg:text-lg">
                        Aquí tienes algunas preguntas frecuentes que pueden
                        ayudarte.
                    </p>
                </div>
                <Accordion
                    type="single"
                    collapsible
                    className="mx-auto w-full space-y-1.5 lg:max-w-3xl"
                >
                    {items.map((item) => (
                        <AccordionItem
                            key={item.id}
                            value={item.id}
                            className="bg-lime-100 rounded-2xl px-2.5"
                        >
                            <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                                    {item.question}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="sm:mb-1 lg:mb-2">
                                <div className="text-muted-foreground lg:text-lg">
                                    {item.answer}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-lime-100 shadow-xl p-4 text-center md:rounded-xl md:p-6 lg:p-8">
                    <div className="relative">
                        <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
                            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-2.webp" />
                            <AvatarFallback>SU</AvatarFallback>
                        </Avatar>
                        <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
                            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-3.webp" />
                            <AvatarFallback>SU</AvatarFallback>
                        </Avatar>
                        <Avatar className="mb-4 size-16 border md:mb-5">
                            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-1.webp" />
                            <AvatarFallback>SU</AvatarFallback>
                        </Avatar>
                    </div>
                    <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
                        Este proyecto es de código abierto y gratuito
                    </h3>
                    <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
                        Siempre estamos buscando formas de mejorar y expandir
                        este proyecto. Si tienes alguna pregunta o sugerencia,
                        no dudes en ponerte en contacto con nosotros.
                    </p>
                    <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
                        <Button className="w-full sm:w-auto" asChild>
                            <a href="#" target="_blank">
                                Contáctanos
                            </a>
                        </Button>
                    </div>
                    {/* redes sociales */}
                    <div className="mt-4 flex gap-4">
                        <a
                            href="#"
                            target="_blank"
                            className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                        >
                            <InstagramIcon className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                        >
                            <FacebookIcon className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                        >
                            <GithubIcon className="h-5 w-5 " />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
