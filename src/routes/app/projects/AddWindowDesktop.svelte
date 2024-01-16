<script lang="ts">
	import { slide } from "svelte/transition";

	export let hidden: boolean;
</script>

{#if !hidden}
	<div class="bg-primary-800 rounded-lg p-2" in:slide>
		<slot />
	</div>
{/if}
