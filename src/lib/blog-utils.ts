import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";

// Definir la interfaz para los posts
export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    category: string;
    coverImage: string;
    readingTime: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
}

// Directorio donde se almacenan los archivos markdown
const postsDirectory = path.join(process.cwd(), "src/content/blog");

// Función para convertir markdown a HTML
async function markdownToHtml(markdown: string): Promise<string> {
    const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify)
        .process(markdown);

    return result.toString();
}

// Función para obtener todos los posts
export async function getAllPosts(): Promise<BlogPost[]> {
    // Verificar si el directorio existe
    if (!fs.existsSync(postsDirectory)) {
        return []; // Retornar un array vacío si no existe el directorio
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = await Promise.all(
        fileNames
            .filter((fileName) => fileName.endsWith(".md"))
            .map(async (fileName) => {
                // Eliminar la extensión ".md" para obtener el slug
                const slug = fileName.replace(/\.md$/, "");

                // Leer el contenido del archivo markdown
                const fullPath = path.join(postsDirectory, fileName);
                const fileContents = fs.readFileSync(fullPath, "utf8");

                // Usar gray-matter para parsear el frontmatter
                const matterResult = matter(fileContents);

                // Calcular el tiempo de lectura
                const readTime = readingTime(matterResult.content);

                // Convertir markdown a HTML
                const contentHtml = await markdownToHtml(matterResult.content);

                // Combinar los datos con el slug
                return {
                    slug,
                    title: matterResult.data.title,
                    date: matterResult.data.date,
                    excerpt: matterResult.data.excerpt || "",
                    category: matterResult.data.category || "General",
                    coverImage: matterResult.data.coverImage || "",
                    readingTime: Math.ceil(readTime.minutes).toString(),
                    author: {
                        name:
                            matterResult.data.author?.name ||
                            "Autor Desconocido",
                        avatar: matterResult.data.author?.avatar || "",
                    },
                    content: contentHtml,
                };
            })
    );

    // Ordenar los posts por fecha, del más reciente al más antiguo
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

// Función para obtener un post específico por su slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    // Verificar si el directorio existe
    if (!fs.existsSync(postsDirectory)) {
        return null; // Retornar null si no existe el directorio
    }

    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);

        // Verificar si el archivo existe
        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        // Calcular el tiempo de lectura
        const readTime = readingTime(matterResult.content);

        // Convertir markdown a HTML
        const contentHtml = await markdownToHtml(matterResult.content);

        return {
            slug,
            title: matterResult.data.title,
            date: matterResult.data.date,
            excerpt: matterResult.data.excerpt || "",
            category: matterResult.data.category || "General",
            coverImage: matterResult.data.coverImage || "",
            readingTime: Math.ceil(readTime.minutes).toString(),
            author: {
                name: matterResult.data.author?.name || "Autor Desconocido",
                avatar: matterResult.data.author?.avatar || "",
            },
            content: contentHtml,
        };
    } catch (error) {
        console.error(`Error al obtener el post ${slug}:`, error);
        return null;
    }
}

// Función para obtener posts relacionados
export async function getRelatedPosts(
    currentSlug: string,
    limit = 3
): Promise<BlogPost[]> {
    const allPosts = await getAllPosts();
    return allPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}
