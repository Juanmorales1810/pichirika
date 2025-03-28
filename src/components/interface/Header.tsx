"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";

const links = [
    { href: "/veterinarias", label: "Veterinarias Cercanas" },
    { href: "/blogs", label: "Blogs" },
    { href: "/adoptar", label: "Adoptar" },
    { href: "/animales-perdidos", label: "Animales perdidos" },
    { href: "/#preguntas-frecuentes", label: "Preguntas frecuentes" },
];

export function Header() {
    const [isFeatureOpen, setIsFeatureOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-2 left-1/2 z-[999] w-[min(90%,1200px)] -translate-x-1/2 rounded-full border border-zinc-200 bg-zinc-100/80 dark:border-zinc-900 dark:bg-zinc-950/80 backdrop-blur-md">
            <div className="flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2 w-40"
                >
                    <Image
                        src="/icon-192x192.png"
                        alt="logo"
                        className="h-8 dark:invert-100"
                        height={32}
                        width={32}
                    />
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className="max-w-max flex-1 items-center justify-center max-lg:hidden">
                    <NavigationMenuList className="flex flex-1 list-none items-center justify-center gap-1">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent px-1.5 data-[state=open]:bg-accent/50">
                                Features
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="space-y-3 rounded-lg bg-muted/50 p-4 w-[400px]">
                                    <Link
                                        href="#"
                                        className="group block rounded-md p-2 transition-colors hover:bg-accent"
                                    >
                                        <div className="transition-transform duration-200 group-hover:translate-x-1">
                                            <div className="font-medium text-primary">
                                                Modern product teams
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Mainline is built on the habits
                                                that make the best product teams
                                                successful
                                            </p>
                                        </div>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="group block rounded-md p-2 transition-colors hover:bg-accent"
                                    >
                                        <div className="transition-transform duration-200 group-hover:translate-x-1">
                                            <div className="font-medium text-primary">
                                                Resource Allocation
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Mainline your resource
                                                allocation and execution
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        {links.map((link) => (
                            <NavigationMenuItem key={link.label}>
                                <Link href={link.href} legacyBehavior passHref>
                                    <NavigationMenuLink className="relative bg-transparent px-1.5 text-sm font-medium">
                                        {link.label}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Login Button and Mobile Menu */}
                <div className="flex items-center gap-2.5">
                    <Link href="/login" className="max-lg:hidden">
                        <Button variant="outline" size="default">
                            <span className="relative z-10">
                                Iniciar Sesión
                            </span>
                        </Button>
                    </Link>
                    <ModeToggle />

                    {/* Mobile Menu Button */}
                    <button
                        className="relative flex size-8 text-muted-foreground lg:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "absolute block h-0.5 w-full rounded-full bg-zinc-900 transition duration-500 ease-in-out dark:bg-zinc-300",
                                    mobileMenuOpen
                                        ? "rotate-45"
                                        : "-translate-y-1.5"
                                )}
                            ></span>
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "absolute block h-0.5 w-full rounded-full bg-zinc-900 transition duration-500 ease-in-out dark:bg-zinc-300",
                                    mobileMenuOpen && "opacity-0"
                                )}
                            ></span>
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "absolute block h-0.5 w-full rounded-full bg-zinc-900 transition duration-500 ease-in-out dark:bg-zinc-300",
                                    mobileMenuOpen
                                        ? "-rotate-45"
                                        : "translate-y-1.5"
                                )}
                            ></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Exactly matching the provided HTML */}
            <div
                className={cn(
                    "fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border bg-white p-6 transition-all duration-300 ease-in-out lg:hidden",
                    mobileMenuOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-4 opacity-0"
                )}
            >
                <nav className="flex flex-1 flex-col divide-y divide-border">
                    <div className="py-4 first:pt-0 last:pb-0">
                        <button
                            className="flex w-full items-center justify-between text-base font-medium text-primary"
                            onClick={() => setIsFeatureOpen(!isFeatureOpen)}
                        >
                            Features
                            <ChevronRight
                                className={cn(
                                    "size-4 transition-transform duration-200",
                                    isFeatureOpen && "rotate-90"
                                )}
                            />
                        </button>
                        <div
                            className={cn(
                                "overflow-hidden transition-all duration-300",
                                isFeatureOpen
                                    ? "max-h-96 opacity-100"
                                    : "max-h-0 opacity-0"
                            )}
                        >
                            <div className="space-y-3 rounded-lg bg-muted/50 p-4">
                                <Link
                                    href="#"
                                    className="group block rounded-md p-2 transition-colors hover:bg-accent"
                                    onClick={() =>
                                        setMobileMenuOpen(!mobileMenuOpen)
                                    }
                                >
                                    <div className="transition-transform duration-200 group-hover:translate-x-1">
                                        <div className="font-medium text-primary">
                                            Modern product teams
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Mainline is built on the habits that
                                            make the best product teams
                                            successful
                                        </p>
                                    </div>
                                </Link>
                                <Link
                                    href="#"
                                    className="group block rounded-md p-2 transition-colors hover:bg-accent"
                                    onClick={() =>
                                        setMobileMenuOpen(!mobileMenuOpen)
                                    }
                                >
                                    <div className="transition-transform duration-200 group-hover:translate-x-1">
                                        <div className="font-medium text-primary">
                                            Resource Allocation
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Mainline your resource allocation
                                            and execution
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="py-4 text-base font-medium text-primary transition-colors first:pt-0 last:pb-0 hover:text-primary/80"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
