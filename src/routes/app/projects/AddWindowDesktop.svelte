<script lang="ts">
	import { slide } from "svelte/transition";

	export let hidden: boolean;
	export let bgColor: string;
</script>

{#if !hidden}
	<div class="{bgColor} rounded-lg p-2 w-full" in:slide>
		<slot />
	</div>
{/if}
