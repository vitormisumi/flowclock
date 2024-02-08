import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "6e39v93r",
  dataset: "production",
  apiVersion: "2024-02-08",
  useCdn: false
});

export const posts = await client.fetch(`*[_type == "post"] | order(_createdAt desc){
  slug,
  author->{name, "imageUrl": image.asset->url},
  title,
  "image": mainImage.asset->url,
  categories[]->{title},
  body,
  _createdAt,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
}`);
