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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    HomeIcon as House,
    ChevronRight,
    Lightbulb,
    Facebook,
    Linkedin,
    Twitter,
} from "lucide-react";

export default function BlogPostPage() {
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
                                href="/"
                                className="hover:text-foreground transition-colors"
                            >
                                Components
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="[&>svg]:size-3.5">
                            <ChevronRight />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem className="inline-flex items-center gap-1.5">
                            <BreadcrumbPage className="text-foreground font-normal">
                                Blog
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Article Title */}
                <h1 className="mt-9 mb-7 max-w-3xl text-4xl font-bold md:mb-10 md:text-7xl">
                    The royal decree that made everyone laugh
                </h1>

                {/* Author Information */}
                <div className="flex items-center gap-3 text-sm md:text-base">
                    <Avatar className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-8 w-8 border">
                        <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            className="aspect-square size-full"
                        />
                    </Avatar>
                    <span>
                        <Link href="#" className="font-medium">
                            John Doe
                        </Link>
                        <span className="ml-1 text-muted-foreground">
                            on September 23, 2024
                        </span>
                    </span>
                </div>

                {/* Two-column Layout */}
                <div className="relative mt-12 grid max-w-screen-xl gap-14 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-6">
                    {/* Main Content Column */}
                    <div className="order-2 lg:order-none lg:col-span-8">
                        <div>
                            <Image
                                src="/placeholder.svg?height=400&width=800"
                                alt="placeholder"
                                width={800}
                                height={400}
                                className="mt-0 mb-8 aspect-video w-full rounded-lg border object-cover"
                            />
                            <p className="text-sm text-muted-foreground">
                                In a kingdom far away, there lived a ruler who
                                faced a peculiar challenge. After much
                                contemplation, he devised an unusual solution
                                that would change everything.
                            </p>
                        </div>

                        {/* Section 1 */}
                        <section id="section1" className="my-8 prose">
                            <h2>How Taxes Work and Why They Matter</h2>
                            <p>
                                The king thought long and hard, and finally came
                                up with <Link href="#">a brilliant plan</Link>:
                                he would tax the jokes in the kingdom.
                            </p>
                            <blockquote>
                                "After all," he said, "everyone enjoys a good
                                joke, so it's only fair that they should pay for
                                the privilege."
                            </blockquote>
                            <p>
                                The king's subjects were not amused. They
                                grumbled and complained, but the king was firm
                            </p>

                            <Alert>
                                <Lightbulb className="h-4 w-4" />
                                <AlertTitle className="col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight">
                                    Royal Decree!
                                </AlertTitle>
                                <AlertDescription className="text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed">
                                    Remember, all jokes must be registered at
                                    the Royal Jest Office before telling them
                                </AlertDescription>
                            </Alert>
                        </section>

                        {/* Section 2 */}
                        <section id="section2" className="prose mb-8">
                            <h2>The Great People's Rebellion</h2>
                            <p>
                                The people of the kingdom, feeling uplifted by
                                the laughter, started to tell jokes and puns
                                again, and soon the entire kingdom was in on the
                                joke.
                            </p>
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>King's Treasury</th>
                                            <th>People's happiness</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Empty</td>
                                            <td>Overflowing</td>
                                        </tr>
                                        <tr className="m-0 border-t p-0 even:bg-muted">
                                            <td>Modest</td>
                                            <td>Satisfied</td>
                                        </tr>
                                        <tr className="m-0 border-t p-0 even:bg-muted">
                                            <td>Full</td>
                                            <td>Ecstatic</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                The king, seeing how much happier his subjects
                                were, realized the error of his ways and
                                repealed the joke tax. Jokester was declared a
                                hero, and the kingdom lived happily ever after.
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section id="section3" className="prose mb-8">
                            <h2>The King's Plan</h2>
                            <p>
                                The king thought long and hard, and finally came
                                up with <Link href="#">a brilliant plan</Link>:
                                he would tax the jokes in the kingdom.
                            </p>
                            <blockquote>
                                "After all," he said, "everyone enjoys a good
                                joke, so it's only fair that they should pay for
                                the privilege."
                            </blockquote>
                            <p>
                                The king's subjects were not amused. They
                                grumbled and complained, but the king was firm:
                            </p>
                            <ul>
                                <li>1st level of puns: 5 gold coins</li>
                                <li>2nd level of jokes: 10 gold coins</li>
                                <li>3rd level of one-liners : 20 gold coins</li>
                            </ul>
                            <p>
                                As a result, people stopped telling jokes, and
                                the kingdom fell into a gloom. But there was one
                                person who refused to let the king's foolishness
                                get him down: a court jester named Jokester.
                            </p>
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="order-1 flex h-fit flex-col text-sm lg:sticky lg:top-8 lg:order-none lg:col-span-3 lg:col-start-10 lg:text-xs">
                        {/* Table of Contents */}
                        <div className="order-3 lg:order-none">
                            <span className="text-xs font-medium">
                                ON THIS PAGE
                            </span>
                            <nav className="mt-2 lg:mt-4">
                                <ul className="space-y-1">
                                    <li>
                                        <a
                                            href="#section1"
                                            className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary"
                                        >
                                            How Taxes Work and Why They Matter
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#section2"
                                            className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary"
                                        >
                                            The Great People's Rebellion
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#section3"
                                            className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary"
                                        >
                                            The King's Plan
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        {/* Separator (mobile only) */}
                        <Separator className="order-2 mt-8 mb-11 lg:hidden" />

                        {/* Social Sharing */}
                        <div className="order-1 flex flex-col gap-2 lg:order-none lg:mt-9">
                            <p className="font-medium text-muted-foreground">
                                Share this article:
                            </p>
                            <ul className="flex gap-2">
                                <li>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="size-9 group rounded-full"
                                    >
                                        <Link href="#">
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
                                        <Link href="#">
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
                                        <Link href="#">
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
