<script lang="ts">
	import { dateFromTimestamp } from '$lib/functions/functions';
	import { PortableText } from '@portabletext/svelte';
	import { Image } from '@unpic/svelte';
	import { Badge } from 'flowbite-svelte';
	import Font from './Font.svelte';

	export let data;
</script>

<div class="grid max-w-4xl text-secondary-900">
	<div class="grid gap-4 pb-8 md:grid-cols-2 lg:grid-cols-5">
		<Image
			layout="constrained"
			breakpoints={[300, 600, 900, 1200, 1500, 1800]}
			src={data.post.image}
			alt={data.post.title}
			aspectRatio={1.6}
			width={1000}
			class="col-span-3 row-start-1 md:col-start-2 lg:col-start-3"
		/>
		<div class="col-start-1 grid content-center gap-4 lg:col-span-2 lg:gap-8">
			<h2 class="text-xl font-bold md:text-3xl">{data.post.title}</h2>
			<div class="flex items-center gap-2 md:gap-4">
				<Image
					layout="fixed"
					breakpoints={[300, 600, 900, 1200, 1500, 1800]}
					src={data.post.author.imageUrl}
					alt="{data.post.author.name} image"
					width={48}
					height={48}
					class="rounded-full"
				/>
				<div class="grid gap-2">
					<p class="font-medium">{data.post.author.name}</p>
					<div class="flex gap-4 text-sm font-light md:gap-6 md:text-base">
						<p>{dateFromTimestamp(data.post._createdAt, 'ddmmyyyy', 0)}</p>
						<p>{data.post.estimatedReadingTime} min read</p>
					</div>
				</div>
			</div>
			<div class="flex gap-2">
				{#each data.post.categories as category}
					<Badge class="bg-primary-700 text-secondary-50">{category.title}</Badge>
				{/each}
			</div>
		</div>
	</div>
	<PortableText
		value={data.post.body}
		components={{
			block: {
				normal: Font,
				h1: Font,
				h2: Font,
				h3: Font
			}
		}}
	/>
</div>
