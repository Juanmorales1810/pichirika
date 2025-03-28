import { PetSearchFilters } from "@/components/pet-search-filters";
import { Department } from "@/validations/registerPetSchema";
import { fontMono } from "@/config/fonts";
import { Suspense } from "react";
import { CardSkeleton } from "@/components/card-skeleton";
import { PetCardGrid } from "@/components/pet-card-grid";

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
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    if (filters.name) params.set("name", filters.name);
    if (filters.location) params.set("location", filters.location);
    if (filters.category) params.set("category", filters.category);

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
    searchParams: Promise<{
        page?: string;
        name?: string;
        location?: string;
        category?: string;
    }>;
}) {
    const params = await searchParams;

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
            <div className="flex flex-wrap max-w-5xl w-full">
                {/* Only the cards section will show loading state */}
                <Suspense fallback={<CardSkeleton />}>
                    <PetCardGrid searchParams={params} />
                </Suspense>
            </div>
        </section>
    );
}
