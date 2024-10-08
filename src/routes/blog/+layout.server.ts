import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "6e39v93r",
  dataset: "production",
  apiVersion: "2024-02-08",
  useCdn: false
});

export async function load() {
    const data = await client.fetch(`*[_type == "post"] | order(_createdAt desc){
      slug,
      author->{name, "imageUrl": image.asset->url},
      title,
      "image": mainImage.asset->url,
      categories[]->{title},
      body,
      _createdAt,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }`);

  return {
      posts: data,
      summaries: data.map((post: any) => ({
          slug: post.slug.current,
          title: post.title,
          author: post.author,
          date: post._createdAt,
          image: post.image,
          categories: post.categories
      }))
    };
}