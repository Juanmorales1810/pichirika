"use client";
import { Department } from "@/validations/userSchema";
import { Pagination } from "@nextui-org/pagination";
import { useState } from "react";
import CardPichiriKa from "./cardpichirika";

interface PaginationProps {
    Array: {
        name: string;
        department: Department;
        street1: string;
        street2: string;
        description: string;
        isHomeless: string;
        image: string;
        _id: string;
    }[];
}

export default function PaginationSection(props: PaginationProps) {
    const { Array } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 10;
    const pets = Array; // Aquí deberías tener tu arreglo de productos
    const totalPages = Math.ceil(pets.length / petsPerPage);

    // Calcular los índices de los productos que se mostrarán en la página actual
    const indexOfLastProduct = currentPage * petsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - petsPerPage;
    const currentPets = pets.slice(indexOfFirstProduct, indexOfLastProduct).reverse();

    return (
        <div className="flex flex-col justify-center items-center w-full h-full gap-2">
            <ul className="flex flex-wrap justify-center gap-2 py-2">
                {currentPets.map((product, index) => (
                    <CardPichiriKa key={index} title={product.name} image={product.image} ubication={product.department} id={product._id} />
                ))}
            </ul>
            <div className="flex justify-center items-center p-2.5">
                <Pagination className="font-semibold" color="success" loop showControls total={totalPages} initialPage={1} page={currentPage}
                    onChange={setCurrentPage} />
            </div>
        </div>
    );
}

