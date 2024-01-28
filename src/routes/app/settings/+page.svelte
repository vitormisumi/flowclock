<script lang="ts">
	import { fade } from 'svelte/transition';
	import Notification from '../../Notification.svelte';
	import { navigating } from '$app/stores';
	import Settings from './Settings.svelte';

	export let form;
</script>

<div class="flex justify-center">
	<div
		class="grid w-full max-w-xl gap-4 md:gap-8"
		in:fade={$navigating?.from?.url.pathname === '/app/session'
			? { duration: 500, delay: 500 }
			: { duration: 0 }}
	>
		<h1 class="text-center text-xl font-bold text-secondary-900 dark:text-secondary-50">Settings</h1>
		<Settings />
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
