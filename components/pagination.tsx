"use client";

import { Department } from "@/validations/registerPetSchema";
import { Pagination } from "@nextui-org/pagination";
import CardPichiriKa from "./cardpichirika";
import { useMemo, useState } from "react";
import useSWR from "swr";

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

const fetcher = (...args: [RequestInfo, RequestInit]) => fetch(...args).then((res) => res.json());

export default function PaginationSection() {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useSWR(`http://localhost:3000/api/registerpet?page=${page}&limit=10`, fetcher, {
        keepPreviousData: true,
    });

    const itemsPerPage = 10;

    const pages = useMemo(() => {
        return data?.totalItems ? Math.ceil(data.totalItems / itemsPerPage) : 0;
    }, [data?.totalItems, itemsPerPage]);

    const loadingState = isLoading || data?.totalItems.length === 0 ? "loading" : "idle";

    return (
        <div className="flex flex-col justify-center items-center w-full h-full gap-2">

            {data?.totalItems === 0 && <h1 className="text-2xl font-semibold">No hay mascotas registradas</h1>}
            {loadingState === "loading" ? (
                <ul className="flex flex-wrap justify-center gap-2 py-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
                        <CardPichiriKa key={index} title="" image="" ubication="capital" id="" skeleton />
                    ))}
                </ul>
            ) : (<ul className="flex flex-wrap justify-center gap-2 py-2">
                {data?.items.map((product: PaginationProps, index: number) => (
                    <CardPichiriKa key={index} title={product.name} image={product.image} ubication={product.department} id={product._id} />
                ))}
            </ul>)}
            {data?.totalItems >= 8 &&
                <div className="flex justify-center items-center p-2.5">
                    <Pagination
                        className="font-semibold"
                        color="success"
                        showControls
                        showShadow
                        loop
                        total={pages}
                        page={page}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
        </div>
    );
}

