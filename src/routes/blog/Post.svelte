<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { dateFromTimestamp } from '$lib/functions/functions';
	import { Image } from '@unpic/svelte';
	import Font from './Font.svelte';

	export let post: Post;
	export let author: Author;
</script>

<div class="max-w-4xl text-primary-900">
	<div class="grid gap-4 pb-16">
		<h2 class="text-3xl font-bold">{post.title}</h2>
		<div class="flex items-center gap-4">
			<Image
				layout="fixed"
				breakpoints={[300, 600, 900, 1200, 1500, 1800]}
				src={author.imageUrl}
				alt="{author.name} image"
				width={48}
				height={48}
				class="rounded-full"
			/>
			<div class="grid gap-2">
				<p class="font-medium">{author.name}</p>
				<div class="flex gap-6 font-light">
					<p>{dateFromTimestamp(post._createdAt, 'ddmmyyyy', 0)}</p>
					<p>{post.estimatedReadingTime} minute read</p>
				</div>
			</div>
		</div>
	</div>
	<PortableText
		value={post.body}
		components={{
			block: {
				normal: Font,
				h1: Font,
				h2: Font,
				h3: Font,
			}
		}}
	/>
</div>
