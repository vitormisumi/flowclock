import { posts } from "./data";

export async function load() {
    return {
        summaries: posts.map((post: any) => ({
            slug: post.slug.current,
            title: post.title,
            author: post.author,
            date: post._createdAt,
            image: post.image,
            categories: post.categories
        }))
    };
}