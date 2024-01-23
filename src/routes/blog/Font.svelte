<!-- CustomHeading (blockStyle) -->
<script lang="ts">
	import type { BlockComponentProps } from '@portabletext/svelte';

	export let portableText: BlockComponentProps;

	$: ({ value } = portableText);
	$: ({ style } = value);

	$: anchorId = `heading-${value._key}`;
</script>

<div class="relative" id={anchorId}>
	{#if style === 'normal'}
		<p class="font-light tracking-wide pb-4"><slot /></p>
	{:else if style === 'h1'}
		<h2 class="pb-4 pt-8 text-4xl font-bold tracking-wide"><slot /></h2>
	{:else if style === 'h2'}
		<h2 class="pb-4 pt-8 text-2xl font-semibold tracking-wide"><slot /></h2>
	{:else if style === 'h3'}
		<h3 class="pb-4 pt-8 text-xl font-medium tracking-wide"><slot /></h3>
	{/if}
</div>
