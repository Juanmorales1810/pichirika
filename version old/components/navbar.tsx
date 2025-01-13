"use client";

import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import { ThemeSwitch } from "@/components/theme-switch";
import { link as linkStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { fontMono } from "@/config/fonts";
import { Logo } from "@/components/icons";
import useStore from "@/context/store";
import Avatar from "boring-avatars";
import NextLink from "next/link";
import clsx from "clsx";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const user = useStore((state) => state.user)
    useStore((state) => state.user)

    console.log(user);


    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e: any) => {
            // Evita que Chrome muestre el aviso de instalación
            e.preventDefault();
            // Guarda el evento para que pueda ser usado más tarde
            setDeferredPrompt(e);
        });
    }, []);

    const handleInstallClick = () => {
        // Verifica si deferredPrompt es null
        if (deferredPrompt !== null) {
            // Muestra el aviso de instalación
            deferredPrompt.prompt();
            // Espera a que el usuario responda al aviso
            deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('El usuario aceptó la instalación');
                } else {
                    console.log('El usuario rechazó la instalación');
                }
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <NextUINavbar
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            isBlurred={false}
            isBordered
            maxWidth="xl"
            position="static"
            className="fixed bg-zinc-50 dark:bg-zinc-950 shadow-md dark:shadow-none">
            <NavbarContent className="basis-1/5 sm:basis-full md:ml-32" justify="center">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink
                        className="flex justify-start items-center gap-1"
                        href="/"
                    >
                        <Logo className="fill-black dark:fill-zinc-100" />
                        <p className={fontMono.className + " font-[900] text-inherit pt-0.5"}>PichiriKa</p>
                    </NextLink>
                </NavbarBrand>
                <ul className="hidden lg:flex gap-4 justify-start">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium font-[900]", fontMono.className
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                {user ? (
                    <NavbarItem className="hidden md:flex">
                        <NextLink href="/" className="flex justify-center items-center gap-2 rounded-full">
                            <p className="font-medium">Bienvenido {user?.name}</p>
                            <div className="h-10 w-10">
                                <Avatar name={`${user?.name}${user?.lastName}`} variant="beam" colors={["#ecfccb", "#bef264", "#84cc16", "#4d7c0f", "#365314"]} />
                            </div>
                        </NextLink>
                    </NavbarItem>
                ) : null}
                <NavbarItem className="hidden sm:flex gap-2">
                    <ThemeSwitch />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <ThemeSwitch />
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu className="bg-zinc-300 dark:bg-zinc-950">
                <div className="flex flex-col justify-center items-center h-full gap-4">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <NextLink href={item.href} onClick={() => { setIsMenuOpen(false) }} className={`text-zinc-950 dark:text-zinc-100 text-4xl uppercase ${fontMono.className}`}>
                                {item.label}
                            </NextLink>
                        </NavbarMenuItem>
                    ))}
                    <NavbarMenuItem>
                        <Button onClick={handleInstallClick} className="text-zinc-950 dark:text-zinc-100 text-4xl uppercase">
                            Instalar
                        </Button>
                    </NavbarMenuItem>
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
