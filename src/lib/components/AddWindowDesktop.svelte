<script lang="ts">
	import { slide } from "svelte/transition";

	export let hidden: boolean;
	export let bgColor: 'bg-secondary-50 dark:bg-secondary-900' | 'bg-secondary-100 dark:bg-secondary-800';
</script>

{#if !hidden}
	<div class="{bgColor} rounded-lg p-2 w-full" in:slide>
		<slot />
	</div>
{/if}
