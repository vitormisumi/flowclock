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
	<div
		transition:blur
		class="fixed bottom-16 sm:bottom-24 lg:bottom-0 z-50 m-4 md:m-0 md:my-8 md:right-1/2 md:translate-x-1/2 lg:pl-24"
	>
		<Alert color={success ? 'green' : 'red'} dismissable>
			<i class={success ? 'fa-solid fa-check' : 'fa-solid fa-circle-exclamation'} slot="icon" />
			{message}
		</Alert>
	</div>
{/if}
