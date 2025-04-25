import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog-utils";
import { notFound } from "next/navigation";

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    // Obtener todos los posts
    const allPosts = await getAllPosts();

    // Configuración de paginación
    const postsPerPage = 8;
    const pageParam = await params.page;
    const currentPage = pageParam ? Number.parseInt(pageParam) : 1;
    const totalPages = Math.ceil(allPosts.length / postsPerPage);

    // Validar que la página solicitada existe
    if (currentPage < 1 || (currentPage > totalPages && totalPages > 0)) {
        notFound();
    }

    // Obtener los posts para la página actual
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = allPosts.slice(startIndex, endIndex);

    return (
        <section className="py-20">
            <div className="container mx-auto px-2">
                <div className="mb-8 md:mb-14 lg:mb-16">
                    <p className="text-wider mb-4 text-sm font-medium text-muted-foreground">
                        Blog
                    </p>
                    <h1 className="mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
                        Nuestro Blog
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Descubre las últimas tendencias, noticias y artículos de
                        interés
                    </p>
                </div>

                <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
                    {currentPosts.map((post) => (
                        <Link
                            href={`/blog/${post.slug}`}
                            key={post.slug}
                            className="group flex flex-col"
                        >
                            <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
                                <div className="h-full w-full transition duration-300 group-hover:scale-105">
                                    <Image
                                        src={
                                            post.coverImage ||
                                            "/placeholder.svg?height=400&width=600"
                                        }
                                        alt={post.title}
                                        width={600}
                                        height={400}
                                        className="aspect-[3/2] h-full w-full object-cover object-center"
                                    />
                                </div>
                            </div>

                            <div>
                                <Badge className="bg-primary text-primary-foreground">
                                    {post.category}
                                </Badge>
                            </div>

                            <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl">
                                {post.title}
                            </div>

                            <div className="mb-4 line-clamp-2 text-sm text-muted-foreground md:mb-5 md:text-base">
                                {post.excerpt}
                            </div>

                            <div className="flex items-center gap-2">
                                <Avatar className="size-12">
                                    <AvatarImage
                                        src={
                                            post.author.avatar ||
                                            "/placeholder.svg?height=48&width=48"
                                        }
                                        alt={post.author.name}
                                        className="aspect-square size-full"
                                    />
                                </Avatar>
                                <div className="flex flex-col gap-px">
                                    <span className="text-xs font-medium">
                                        {post.author.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {post.date}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="mt-8 border-t border-border py-2 md:mt-10 lg:mt-12">
                        <nav
                            role="navigation"
                            aria-label="pagination"
                            className="mx-auto flex w-full justify-center"
                        >
                            <ul className="flex flex-row items-center gap-1 w-full justify-between">
                                <li>
                                    <Link
                                        href={
                                            currentPage > 1
                                                ? `/blog?page=${
                                                      currentPage - 1
                                                  }`
                                                : "#"
                                        }
                                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 py-2 has-[>svg]:px-3 gap-1 px-2.5 sm:pl-2.5 ${
                                            currentPage <= 1
                                                ? "pointer-events-none opacity-50"
                                                : "hover:bg-accent hover:text-accent-foreground"
                                        }`}
                                        aria-label="Ir a la página anterior"
                                    >
                                        <ChevronLeft className="size-4" />
                                        <span className="hidden sm:block">
                                            Anterior
                                        </span>
                                    </Link>
                                </li>

                                <div className="hidden items-center gap-1 md:flex">
                                    {Array.from(
                                        { length: totalPages },
                                        (_, i) => i + 1
                                    ).map((page) => (
                                        <li key={page}>
                                            <Link
                                                href={`/blog?page=${page}`}
                                                className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all size-9 ${
                                                    page === currentPage
                                                        ? "bg-primary text-primary-foreground"
                                                        : "hover:bg-accent hover:text-accent-foreground"
                                                }`}
                                            >
                                                {page}
                                            </Link>
                                        </li>
                                    ))}
                                </div>

                                <li>
                                    <Link
                                        href={
                                            currentPage < totalPages
                                                ? `/blog?page=${
                                                      currentPage + 1
                                                  }`
                                                : "#"
                                        }
                                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 py-2 has-[>svg]:px-3 gap-1 px-2.5 sm:pr-2.5 ${
                                            currentPage >= totalPages
                                                ? "pointer-events-none opacity-50"
                                                : "hover:bg-accent hover:text-accent-foreground"
                                        }`}
                                        aria-label="Ir a la página siguiente"
                                    >
                                        <span className="hidden sm:block">
                                            Siguiente
                                        </span>
                                        <ChevronRight className="size-4" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </section>
    );
}
