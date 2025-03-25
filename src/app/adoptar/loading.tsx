import CardPichiriKa from "@/components/cardpichirika";
import { PetIcon, UserIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { fontMono } from "@/config/fonts";
import Link from "next/link";

export default function Loading() {
    return (
        <section className="flex flex-col items-center w-full h-full min-h-[calc(100vh-80px)] mt-20">
            {/* <div className="flex gap-4 py-2">
                <Button className="font-semibold">
                    <Link
                        href="/adopt/register-pet"
                        className="flex items-center gap-2"
                    >
                        <PetIcon className="dark:fill-white" />
                        Registrar animal
                    </Link>
                </Button>
                <Button className="font-semibold">
                    <Link
                        href="/adopt/login"
                        className="flex items-center gap-2"
                    >
                        <UserIcon className="dark:fill-white" />
                        Iniciar sesión
                    </Link>
                </Button>
            </div> */}
            <h1
                className={
                    "font-bold text-center text-6xl " + fontMono.className
                }
            >
                Algunos PichiriKas
            </h1>
            <div className="flex flex-wrap max-w-5xl">
                <div className="flex flex-col justify-center items-center w-full h-full gap-2">
                    <ul className="flex flex-wrap justify-center gap-2 py-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
                            <CardPichiriKa
                                key={index}
                                title=""
                                image=""
                                ubication="capital"
                                id=""
                                skeleton
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
