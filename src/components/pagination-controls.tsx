"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    filterParams?: string;
}

export function PaginationControls({
    currentPage,
    totalPages,
    filterParams = "",
}: PaginationControlsProps) {
    const router = useRouter();

    const handlePageChange = useCallback(
        (page: number) => {
            // Preserve filter parameters when changing pages
            const url = filterParams
                ? `?${filterParams}&page=${page}`
                : `?page=${page}`;
            router.push(url);
        },
        [router, filterParams]
    );

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pageNumbers = [];

        // Always show first page
        pageNumbers.push(1);

        // Calculate range around current page
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        // Add ellipsis after first page if needed
        if (startPage > 2) {
            pageNumbers.push("ellipsis-start");
        }

        // Add pages around current page
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
            pageNumbers.push("ellipsis-end");
        }

        // Always show last page if there's more than one page
        if (totalPages > 1) {
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    if (totalPages <= 1) {
        return null;
    }

    // Create URL with current filters
    const getPageUrl = (page: number) => {
        return filterParams ? `?${filterParams}&page=${page}` : `?page=${page}`;
    };

    return (
        <Pagination className="my-1">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={getPageUrl(currentPage > 1 ? currentPage - 1 : 1)}
                        onClick={(e) => {
                            if (currentPage > 1) {
                                e.preventDefault();
                                handlePageChange(currentPage - 1);
                            }
                        }}
                        className={
                            currentPage <= 1
                                ? "pointer-events-none opacity-50"
                                : ""
                        }
                    />
                </PaginationItem>

                {getPageNumbers().map((page, i) => {
                    if (page === "ellipsis-start" || page === "ellipsis-end") {
                        return (
                            <PaginationItem key={`ellipsis-${i}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={`page-${page}`}>
                            <PaginationLink
                                href={getPageUrl(page as number)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(page as number);
                                }}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        href={getPageUrl(
                            currentPage < totalPages
                                ? currentPage + 1
                                : totalPages
                        )}
                        onClick={(e) => {
                            if (currentPage < totalPages) {
                                e.preventDefault();
                                handlePageChange(currentPage + 1);
                            }
                        }}
                        className={
                            currentPage >= totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
