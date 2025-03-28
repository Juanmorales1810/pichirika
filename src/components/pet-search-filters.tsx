"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import type { Department } from "@/validations/registerPetSchema";

// Define categories - adjust these based on your actual categories
const CATEGORIES = ["Perro", "Gato", "Ave", "Otro"];

// Use the Department type from your schema
const DEPARTMENTS: Department[] = [
    "capital",
    "santaLucia",
    "chimbas",
    "rawson",
    "pocito",
    "rivadavia",
    "albardon",
    "zonda",
    "DeMayo",
    "caucete",
    "iglesia",
    "jachal",
    "sarmiento",
    "sanMartin",
    "calingasta",
    "DeJulio",
    "angaco",
    "valleFertil",
    "ullum",
];

export function PetSearchFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [name, setName] = useState(searchParams.get("name") || "");
    const [location, setLocation] = useState(
        searchParams.get("location") || ""
    );
    const [category, setCategory] = useState(
        searchParams.get("category") || ""
    );

    // Apply filters and reset to page 1
    const applyFilters = useCallback(() => {
        const params = new URLSearchParams();

        if (name) params.set("name", name);
        if (location) params.set("location", location);
        if (category) params.set("category", category);

        // Reset to page 1 when filters change
        params.set("page", "1");

        router.push(`?${params.toString()}`);
    }, [name, location, category, router]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    // Clear all filters
    const clearFilters = () => {
        setName("");
        setLocation("");
        setCategory("");
        router.push("?page=1");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-4xl mx-auto mb-1 space-y-4 px-2"
        >
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                    <Input
                        placeholder="Buscar por nombre..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white"
                    />
                </div>

                <div className="w-full sm:w-48">
                    <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Localidad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                Todas las localidades
                            </SelectItem>
                            {DEPARTMENTS.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                    {dept.charAt(0).toUpperCase() +
                                        dept.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full sm:w-48">
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Categoría" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                Todas las categorías
                            </SelectItem>
                            {CATEGORIES.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                </Button>
                {(name || location || category) && (
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={clearFilters}
                        >
                            <X className="h-4 w-4 mr-2" />
                            Limpiar filtros
                        </Button>
                    </div>
                )}
            </div>
        </form>
    );
}
