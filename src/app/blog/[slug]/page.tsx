import Image from "next/image";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    HomeIcon as House,
    ChevronRight,
    Facebook,
    Linkedin,
    Twitter,
} from "lucide-react";
import { getPostBySlug } from "@/lib/blog-utils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const paramsResolved = await params;
    const post = await getPostBySlug(paramsResolved.slug);

    if (!post) {
        return {
            title: "Post no encontrado",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const paramsResolved = await params;

    const post = await getPostBySlug(paramsResolved.slug);

    if (!post) {
        notFound();
    }

    // Extraer secciones del contenido HTML para la tabla de contenidos
    // Esta es una implementación básica, podría mejorarse con un parser HTML más robusto
    const extractSections = (content: string) => {
        const h2Regex = /<h2.*?>(.*?)<\/h2>/g;
        const sections = [];
        let match;

        while ((match = h2Regex.exec(content)) !== null) {
            const title = match[1].replace(/<.*?>/g, "").trim();
            const id = title
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");
            sections.push({ id, title });
        }

        return sections;
    };

    const sections = extractSections(post.content);

    // Añadir IDs a los encabezados h2 en el contenido
    const contentWithIds = post.content.replace(
        /<h2(.*?)>(.*?)<\/h2>/g,
        (match, attrs, title) => {
            const id = title
                .replace(/<.*?>/g, "")
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");
            return `<h2${attrs} id="${id}">${title}</h2>`;
        }
    );

    return (
        <section className="py-20">
            <div className="container mx-auto px-2">
                {/* Breadcrumb Navigation */}
                <Breadcrumb>
                    <BreadcrumbList className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5">
                        <BreadcrumbItem className="inline-flex items-center gap-1.5">
                            <BreadcrumbLink
                                href="/"
                                className="hover:text-foreground transition-colors"
                            >
                                <House className="h-4 w-4" />
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="[&>svg]:size-3.5">
                            <ChevronRight />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem className="inline-flex items-center gap-1.5">
                            <BreadcrumbLink
                                href="/blog"
                                className="hover:text-foreground transition-colors"
                            >
                                Blog
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="[&>svg]:size-3.5">
                            <ChevronRight />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem className="inline-flex items-center gap-1.5">
                            <BreadcrumbPage className="text-foreground font-normal">
                                {post.title}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Article Title */}
                <h1 className="mt-9 mb-7 max-w-3xl text-4xl font-bold md:mb-10 md:text-7xl">
                    {post.title}
                </h1>

                {/* Author Information */}
                <div className="flex items-center gap-3 text-sm md:text-base">
                    <Avatar className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-8 w-8 border">
                        <AvatarImage
                            src={
                                post.author.avatar ||
                                "/placeholder.svg?height=32&width=32"
                            }
                            alt={post.author.name}
                            className="aspect-square size-full"
                        />
                    </Avatar>
                    <span>
                        <span className="font-medium">{post.author.name}</span>
                        <br className="hidden md:inline" />
                        <span className="ml-1 text-muted-foreground">
                            {post.date}
                        </span>
                    </span>
                </div>

                {/* Two-column Layout */}
                <div className="relative mt-12 grid max-w-screen-xl gap-14 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-6">
                    {/* Main Content Column */}
                    <div className="order-2 lg:order-none lg:col-span-8">
                        <div>
                            <Image
                                src={
                                    post.coverImage ||
                                    "/placeholder.svg?height=400&width=800"
                                }
                                alt={post.title}
                                width={800}
                                height={400}
                                className="mt-0 mb-8 aspect-video w-full rounded-lg border object-cover"
                            />
                            <p className="text-sm text-muted-foreground">
                                {post.excerpt}
                            </p>
                        </div>

                        {/* Main Content */}
                        <div
                            className="prose prose-lg max-w-none mt-8"
                            dangerouslySetInnerHTML={{ __html: contentWithIds }}
                        />
                    </div>

                    {/* Sidebar Column */}
                    <div className="order-1 flex h-fit flex-col text-sm lg:sticky lg:top-20 lg:order-none lg:col-span-3 lg:col-start-10 lg:text-xs">
                        {/* Table of Contents */}
                        {sections.length > 0 && (
                            <div className="order-3 lg:order-none">
                                <span className="text-xs font-medium">
                                    EN ESTA PÁGINA
                                </span>
                                <nav className="mt-2 lg:mt-4">
                                    <ul className="space-y-1">
                                        {sections.map((section) => (
                                            <li key={section.id}>
                                                <a
                                                    href={`#${section.id}`}
                                                    className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary"
                                                >
                                                    {section.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        )}

                        {/* Separator (mobile only) */}
                        <Separator className="order-2 mt-8 mb-11 lg:hidden" />

                        {/* Social Sharing */}
                        <div className="order-1 flex flex-col gap-2 lg:order-none lg:mt-9">
                            <p className="font-medium text-muted-foreground">
                                Compartir este artículo:
                            </p>
                            <ul className="flex gap-2">
                                <li>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="size-9 group rounded-full"
                                    >
                                        <Link
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                                typeof window !== "undefined"
                                                    ? window.location.href
                                                    : ""
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Facebook className="h-4 w-4 fill-muted-foreground text-muted-foreground transition-colors group-hover:fill-primary group-hover:text-primary" />
                                        </Link>
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="size-9 group rounded-full"
                                    >
                                        <Link
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                                typeof window !== "undefined"
                                                    ? window.location.href
                                                    : ""
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Linkedin className="h-4 w-4 fill-muted-foreground text-muted-foreground transition-colors group-hover:fill-primary group-hover:text-primary" />
                                        </Link>
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="size-9 group rounded-full"
                                    >
                                        <Link
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                                typeof window !== "undefined"
                                                    ? window.location.href
                                                    : ""
                                            )}&text=${encodeURIComponent(
                                                post.title
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Twitter className="h-4 w-4 fill-muted-foreground text-muted-foreground transition-colors group-hover:fill-primary group-hover:text-primary" />
                                        </Link>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
