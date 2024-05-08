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
import { HeartFilledIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";
import { fontMono } from "@/config/fonts";
import { Logo } from "@/components/icons";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import clsx from "clsx";

export const Navbar = () => {
    return (
        <NextUINavbar maxWidth="xl" position="static" className="fixed">
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
                <NavbarItem className="hidden sm:flex gap-2">
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className="hidden md:flex">
                    <Button
                        isExternal
                        as={Link}
                        className="text-sm font-normal text-default-600 bg-default-100"
                        href={siteConfig.links.sponsor}
                        startContent={
                            <HeartFilledIcon className="text-danger" />
                        }
                        variant="flat"
                    >
                        Sponsor
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <ThemeSwitch />
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link color="primary" href={item.href} size="lg">
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
