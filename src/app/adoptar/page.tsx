import { PetIcon, UserIcon } from "@/components/icons";
import { fontMono } from "@/config/fonts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Department } from "@/validations/registerPetSchema";
import CardPichiriKa from "@/components/cardpichirika";
import { PaginationControls } from "@/components/pagination-controls";
import RegisterPetCTA from "@/components/register-pet-cta";

interface PaginationProps {
    name: string;
    department: Department;
    street1: string;
    street2: string;
    description: string;
    isHomeless: string;
    image: string;
    _id: string;
}

interface PetsResponse {
    items: PaginationProps[];
    totalItems: number;
}

async function getPets(page: number, limit: number): Promise<PetsResponse> {
    // Use absolute URL for production or relative URL for development
    const url =
        process.env.NODE_ENV === "production"
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/registerpet?page=${page}&limit=${limit}`
            : `http://localhost:3000/api/registerpet?page=${page}&limit=${limit}`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to fetch pets");
    }

    return res.json();
}

export default async function PetsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }> | { page?: string };
}) {
    // Asegurarnos de que searchParams esté resuelto
    const params =
        searchParams instanceof Promise ? await searchParams : searchParams;
    const currentPage = Number(params.page) || 1;
    const itemsPerPage = 7;

    const data = await getPets(currentPage, itemsPerPage);
    const totalPages = data?.totalItems
        ? Math.ceil(data.totalItems / itemsPerPage)
        : 0;
    return (
        <section className="flex flex-col items-center w-full h-full min-h-[calc(100vh)] pt-20">
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
                    {data?.totalItems === 0 && (
                        <p className="text-2xl font-semibold">
                            No hay mascotas registradas
                        </p>
                    )}

                    <ul className="flex flex-wrap justify-center gap-2 py-2">
                        <RegisterPetCTA registerUrl="/adoptar/registrar-mascota" />
                        {data?.items.map(
                            (product: PaginationProps, index: number) => (
                                <CardPichiriKa
                                    key={index}
                                    title={product.name}
                                    image={product.image}
                                    ubication={product.department}
                                    id={product._id}
                                />
                            )
                        )}
                    </ul>

                    {data?.totalItems >= 8 && (
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
