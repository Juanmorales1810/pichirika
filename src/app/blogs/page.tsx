import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    author: {
        name: string;
        avatar: string;
        date: string;
    };
}

const blogPosts: BlogPost[] = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: "Duis sem sem, gravida vel porttitor eu, volutpat ut arcu",
    description:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
    category: "Ut varius dolor turpis",
    image: "/placeholder.svg?height=400&width=600",
    author: {
        name: "Jane Doe",
        avatar: "/placeholder.svg?height=48&width=48",
        date: "1 Jan 2024",
    },
}));

export default function BlogPage() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-2">
                <div className="mb-8 md:mb-14 lg:mb-16">
                    <p className="text-wider mb-4 text-sm font-medium text-muted-foreground">
                        Eyebrow
                    </p>
                    <h1 className="mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
                        Blog
                    </h1>
                    <p>
                        Duis sem sem, gravida vel porttitor eu, volutpat ut arcu
                    </p>
                </div>

                <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
                    {blogPosts.map((post) => (
                        <Link
                            href="#"
                            key={post.id}
                            className="group flex flex-col"
                        >
                            <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
                                <div className="h-full w-full transition duration-300 group-hover:scale-105">
                                    <Image
                                        src={post.image || "/placeholder.svg"}
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
                                {post.description}
                            </div>

                            <div className="flex items-center gap-2">
                                <Avatar className="size-12">
                                    <AvatarImage
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        className="aspect-square size-full"
                                    />
                                </Avatar>
                                <div className="flex flex-col gap-px">
                                    <span className="text-xs font-medium">
                                        {post.author.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {post.author.date}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 border-t border-border py-2 md:mt-10 lg:mt-12">
                    <nav
                        role="navigation"
                        aria-label="pagination"
                        className="mx-auto flex w-full justify-center"
                    >
                        <ul className="flex flex-row items-center gap-1 w-full justify-between">
                            <li>
                                <Link
                                    href="#"
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground h-9 py-2 has-[>svg]:px-3 gap-1 px-2.5 sm:pl-2.5"
                                    aria-label="Go to previous page"
                                >
                                    <ChevronLeft className="size-4" />
                                    <span className="hidden sm:block">
                                        Previous
                                    </span>
                                </Link>
                            </li>

                            <div className="hidden items-center gap-1 md:flex">
                                {[1, 2, 3].map((page) => (
                                    <li key={page}>
                                        <Link
                                            href="#"
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground size-9"
                                        >
                                            {page}
                                        </Link>
                                    </li>
                                ))}
                            </div>

                            <li>
                                <Link
                                    href="#"
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground h-9 py-2 has-[>svg]:px-3 gap-1 px-2.5 sm:pr-2.5"
                                    aria-label="Go to next page"
                                >
                                    <span className="hidden sm:block">
                                        Next
                                    </span>
                                    <ChevronRight className="size-4" />
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    );
}
