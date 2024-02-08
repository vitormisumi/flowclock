import { error } from '@sveltejs/kit';

export async function load({ params, parent }) {
  const { posts } = await parent();
  const post = posts.find((post: any) => post.slug.current === params.slug);

  if (!post) throw error(404);

  return {
    post
  };
}