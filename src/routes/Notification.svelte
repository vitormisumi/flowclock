<script lang="ts">
	import { Alert } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';

	export let message: string;
	export let success: boolean;

	let show = false;
	onMount(() => {
		show = true;
		setTimeout(() => {
			show = false;
		}, 5000);
	});
</script>

{#if show}
	<div
		transition:slide={{ duration: 500 }}
		class="pointer-events-none fixed left-0 top-0 z-50 flex w-full justify-center px-12 md:px-40 lg:left-12 landscape:left-8 landscape:md:left-12"
		style:left={!$page.url.pathname.startsWith('/app') ? '0' : ''}
	>
		<Alert color="none" class="rounded-t-none bg-secondary-100 dark:bg-secondary-800 {success ? 'text-green-500' : 'text-red-500'}">
			<iconify-icon icon="{success ? 'ion:checkmark-circle' : 'ion:alert-circle'}" slot="icon" />
			{message}
		</Alert>
	</div>
{/if}
