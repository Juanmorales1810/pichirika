import { PetIcon, UserIcon } from "@/components/icons";
import { fontMono } from "@/config/fonts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Department } from "@/validations/registerPetSchema";
import CardPichiriKa from "@/components/cardpichirika";
import { PaginationControls } from "@/components/pagination-controls";
import RegisterPetCTA from "@/components/register-pet-cta";
import { PetSearchFilters } from "@/components/pet-search-filters";

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

async function getPets(
    page: number,
    limit: number,
    filters: {
        name?: string;
        location?: string;
        category?: string;
    }
): Promise<PetsResponse> {
    // Build query parameters
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    if (filters.name) params.set("name", filters.name);
    if (filters.location) params.set("location", filters.location);
    if (filters.category) params.set("category", filters.category);

    // Use absolute URL for production or relative URL for development
    const baseUrl =
        process.env.NODE_ENV === "production"
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/registerpet`
            : `http://localhost:3000/api/registerpet`;

    const url = `${baseUrl}?${params.toString()}`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to fetch pets");
    }

    return res.json();
}

export default async function PetsPage({
    searchParams,
}: {
    searchParams:
        | Promise<{
              page?: string;
              name?: string;
              location?: string;
              category?: string;
          }>
        | {
              page?: string;
              name?: string;
              location?: string;
              category?: string;
          };
}) {
    // Ensure searchParams is resolved
    const params =
        searchParams instanceof Promise ? await searchParams : searchParams;
    const currentPage = Number(params.page) || 1;
    const itemsPerPage = 9;

    // Extract filter values
    const filters = {
        name: params.name,
        location: params.location,
        category: params.category,
    };

    const data = await getPets(currentPage, itemsPerPage, filters);
    const totalPages = data?.totalItems
        ? Math.ceil(data.totalItems / itemsPerPage)
        : 0;

    // Create a function to preserve current filters when changing pages
    const getFilterParams = () => {
        const filterParams = new URLSearchParams();
        if (params.name) filterParams.set("name", params.name);
        if (params.location) filterParams.set("location", params.location);
        if (params.category) filterParams.set("category", params.category);
        return filterParams.toString();
    };
    return (
        <section className="flex flex-col items-center w-full h-full min-h-[calc(100vh)] pt-20">
            <h1
                className={
                    "font-bold text-center text-6xl " + fontMono.className
                }
            >
                Algunos PichiriKas
            </h1>
            {/* Search Filters */}
            <div className="w-full max-w-5xl mt-6">
                <PetSearchFilters />
            </div>
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

                    {data?.totalItems >= 9 && (
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            filterParams={getFilterParams()}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
