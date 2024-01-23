<script lang="ts">
	import Post from './Post.svelte';
	import Navbar from './Navbar.svelte';

	export let data;

	function findAuthor(post: Post) {
		return data.author.find((x: Author) => x._id === post.author._ref);
	}
</script>

<Navbar />
<div class="grid justify-center bg-secondary-50 p-4 pt-20 md:p-8 md:pt-32 lg:p-12 lg:pt-40">
	{#each data.posts as post}
		<Post {post} author={findAuthor(post)} />
	{/each}
</div>
