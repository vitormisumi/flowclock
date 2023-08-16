<script lang="ts">
	import { Alert } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';

	export let message: string;
	export let success: boolean;

	let show: boolean = true;
	onMount(() => {
		setTimeout(() => {
			show = false;
		}, 5000);
	});
</script>

{#if show}
	<div transition:blur class="fixed bottom-16 sm:bottom-24 lg:bottom-0 z-50 m-4">
		<Alert color={success ? "green" : "red"} dismissable>
			<i class="fa-solid fa-check" slot="icon" />
			{message}
		</Alert>
	</div>
{/if}
