import type { Department } from "@/validations/registerPetSchema";
import CardPichiriKa from "@/components/cardpichirika";
import { PaginationControls } from "@/components/pagination-controls";
import RegisterPetCTA from "@/components/register-pet-cta";
import Link from "next/link";

interface PaginationProps {
    petName: string;
    description: string;
    lostDate: string;
    department?: string;
    lat: string;
    lng: string;
    ownerName: string;
    phoneNumber: string;
    canCall: boolean;
    canWhatsapp: boolean;
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
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/register-lost-pets`
            : `http://localhost:3000/api/register-lost-pets`;

    const url = `${baseUrl}?${params.toString()}`;

    // This artificial delay can be removed in production
    // await new Promise(resolve => setTimeout(resolve, 1500));

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to fetch pets");
    }

    return res.json();
}

export async function LostPetCardGrid({
    searchParams,
}: {
    searchParams: {
        page?: string;
        name?: string;
        location?: string;
        category?: string;
    };
}) {
    const currentPage = Number(searchParams.page) || 1;
    const itemsPerPage = 9;

    // Extract filter values
    const filters = {
        name: searchParams.name,
        location: searchParams.location,
        category: searchParams.category,
    };

    const data = await getPets(currentPage, itemsPerPage, filters);
    const totalPages = data?.totalItems
        ? Math.ceil(data.totalItems / itemsPerPage)
        : 0;

    // Create a function to preserve current filters when changing pages
    const getFilterParams = () => {
        const filterParams = new URLSearchParams();
        if (searchParams.name) filterParams.set("name", searchParams.name);
        if (searchParams.location)
            filterParams.set("location", searchParams.location);
        if (searchParams.category)
            filterParams.set("category", searchParams.category);
        return filterParams.toString();
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-full gap-2">
            {data?.totalItems === 0 && (
                <div className="text-center py-8">
                    <p className="text-2xl font-semibold mb-2">
                        No hay mascotas que coincidan con tu búsqueda
                    </p>
                    <p className="text-muted-foreground">
                        Intenta con otros filtros o{" "}
                        <Link
                            href="/mascotas-perdidas"
                            className="text-primary hover:underline"
                        >
                            ver todas las mascotas
                        </Link>
                    </p>
                </div>
            )}

            <ul className="flex flex-wrap justify-center gap-2 py-2">
                <RegisterPetCTA
                    lostPet
                    registerUrl="/mascotas-perdidas/registrar-mascota-perdida"
                />
                {data?.items.map((product: PaginationProps, index: number) => (
                    <CardPichiriKa
                        lostPet
                        key={index}
                        title={product.petName}
                        image={product.image}
                        ubication={product.department as Department}
                        id={product._id}
                    />
                ))}
            </ul>

            {data?.totalItems >= 9 && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    filterParams={getFilterParams()}
                />
            )}
        </div>
    );
}
