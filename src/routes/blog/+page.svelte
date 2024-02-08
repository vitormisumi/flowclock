<script>
	import { Image } from '@unpic/svelte';
	import { Badge } from 'flowbite-svelte';

	export let data;
</script>

<ul class="grid grid-cols-1 gap-8 md:grid-cols-3">
	{#each data.summaries as { slug, title, date, image, categories }}
		<li class="relative">
			<a href="/blog/{slug}" class="font-bold">
				<Image
					layout="constrained"
					breakpoints={[300, 600, 900, 1200, 1500, 1800]}
					src={image}
					alt={title}
					aspectRatio={1.6}
					width={1000}
				/>
				{title}
			</a>
			<p class="font-light tracking-wide">
				{new Date(date).toLocaleDateString('en-US', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				})}
			</p>
			<div class="absolute left-0 top-0 flex gap-2 p-2">
				{#each categories as category}
					<Badge class="bg-primary-50 text-secondary-900">{category.title}</Badge>
				{/each}
			</div>
		</li>
	{/each}
</ul>
