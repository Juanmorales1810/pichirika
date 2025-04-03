import { CardSkeleton } from "@/components/card-skeleton";
import { LostPetCardGrid } from "@/components/lost-pet-card-grid";
import { PetSearchFilters } from "@/components/pet-search-filters";
import { fontMono } from "@/config/fonts";
import { Suspense } from "react";

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
                PichiriKas Perdidos
            </h1>
            {/* Search Filters */}
            <div className="w-full max-w-5xl mt-6">
                <PetSearchFilters />
            </div>
            <div className="flex flex-wrap max-w-5xl w-full">
                {/* Only the cards section will show loading state */}
                <Suspense fallback={<CardSkeleton lostPet />}>
                    <LostPetCardGrid searchParams={params} />
                </Suspense>
            </div>
        </section>
    );
}
