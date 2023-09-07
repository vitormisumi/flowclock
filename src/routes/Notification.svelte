<script lang="ts">
	import { Alert } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let message: string;
	export let success: boolean;

	let show: boolean = false;
	onMount(() => {
		show = true;
		setTimeout(() => {
			show = false;
		}, 5000);
	});
</script>

{#if show}
	<div transition:slide={{duration: 500}} class="fixed top-0 left-0 lg:left-12 px-16 flex justify-center w-full z-50">
		<Alert color={success ? 'green' : 'red'} class="rounded-t-none">
			<i class={success ? 'fa-solid fa-check' : 'fa-solid fa-circle-exclamation'} slot="icon" />
			{message}
		</Alert>
	</div>
{/if}
