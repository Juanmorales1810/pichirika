import { Department, mappedDepartment } from "@/validations/registerPetSchema";
import { Button } from "./ui/button";
import { fontMono } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";

interface CardPichiriKaProps {
    id: string;
    title: string;
    image: string;
    ubication: Department;
    skeleton?: boolean;
}

export default function CardPichiriKa(props: CardPichiriKaProps) {
    const { title, image, ubication, id, skeleton } = props;
    return (
        <article className="flex flex-col justify-center items-center gap-4 min-w-40 max-w-48 bg-lime-50 dark:bg-lime-800 rounded-2xl p-4 border-3 border-lime-700 dark:border-lime-400">
            <header className="">
                {skeleton ? (
                    <div className="animate-pulse h-[154px] bg-lime-700 w-full rounded-xl aspect-square object-cover"></div>
                ) : (
                    <Image
                        className="rounded-xl aspect-square object-cover"
                        src={image}
                        alt={title}
                        width={200}
                        height={200}
                    />
                )}
            </header>
            <section className="text-center flex flex-col gap-2 w-full">
                {skeleton ? (
                    <div className="animate-pulse h-4 bg-lime-700 w-full rounded delay-200"></div>
                ) : (
                    <h3 className={"text-2xl font-bold " + fontMono.className}>
                        {title}
                    </h3>
                )}
                {skeleton ? (
                    <div className="animate-pulse h-4 bg-lime-700 w-full rounded delay-400"></div>
                ) : (
                    <p className="font-semibold">
                        {ubication in mappedDepartment
                            ? mappedDepartment[ubication]
                            : ubication}
                    </p>
                )}
            </section>
            <footer className="flex justify-center items-center gap-2 w-full">
                {skeleton ? (
                    <div className="animate-pulse h-8 bg-lime-700 w-1/2 rounded delay-600"></div>
                ) : (
                    <Button className="font-semibold" color="success">
                        <Link
                            href={`/adopt/${id}`}
                            className="flex items-center gap-2"
                        >
                            Adoptar
                        </Link>
                    </Button>
                )}
            </footer>
        </article>
    );
}
