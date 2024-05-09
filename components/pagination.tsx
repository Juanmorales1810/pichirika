"use client";
import { Button } from "@nextui-org/button";
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/pagination";
import { useState } from "react";
import CardPichiriKa from "./cardpichirika";

interface PaginationProps {
    Array: {
        "Nombre": string;
        "Ubicacion": string;
        "Fecha": string;
        "Imagen": string;
    }[];
}

export default function PaginationSection(props: PaginationProps) {
    const { Array } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const products = Array; // Aquí deberías tener tu arreglo de productos
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Calcular los índices de los productos que se mostrarán en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="flex flex-col justify-center items-center w-full h-full gap-2">
            <ul className="flex flex-wrap justify-center gap-4 py-4">
                {currentProducts.map((product, index) => (
                    <CardPichiriKa key={index} title={product.Nombre} fecha={product.Fecha} image={product.Imagen} ubication={product.Ubicacion} />
                ))}
            </ul>
            <Pagination loop showControls total={totalPages} initialPage={1} page={currentPage}
                onChange={setCurrentPage} />
        </div>
    );
}

