import { Button } from "@nextui-org/button";
import Image from "next/image";
import { fontMono } from "@/config/fonts";
import Link from "next/link";


interface CardPichiriKaProps {
    id: number;
    title: string;
    fecha: string;
    image: string;
    ubication: string;
}

export default function CardPichiriKa(props: CardPichiriKaProps) {
    const { title, fecha, image, ubication, id } = props;
    return (
        <article className="flex flex-col justify-center items-center gap-4 min-w-40 max-w-48 bg-lime-300 dark:bg-lime-800 rounded-2xl p-4 border-3 border-lime-700 dark:border-lime-400">
            <header>
                <Image className="rounded-xl" src={image} alt={title} width={200} height={200} />
            </header>
            <section className="text-center">
                <h3 className={"text-2xl font-bold " + fontMono.className}>{title}</h3>
                <p className="font-semibold">{ubication}</p>
            </section>
            <footer className="flex justify-center items-center gap-2">
                <small className="text-xs">{fecha}</small>
                <Button as={Link} href={`/adopt/${id}`} className="font-semibold" variant="solid" color="success">Adoptar</Button>
            </footer>

        </article>
    )
}