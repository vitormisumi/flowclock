import {createClient} from "@sanity/client";

const client = createClient({
  projectId: "6e39v93r",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: false
});

export async function load() {
  const posts = await client.fetch(`*[_type == "post"] {
      author,
      title,
      body,
      _createdAt,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }`);
  const author = await client.fetch(`*[_type == "author"] {
      name,
      _id,
      "imageUrl": image.asset->url,
    }`);
  
  if (posts && author) {
    return {
      posts: posts,
      author: author
    };
  }

  return {
    status: 500,
    body: new Error("Internal Server Error")
  };
}