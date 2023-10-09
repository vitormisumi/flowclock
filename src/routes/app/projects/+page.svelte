<script lang="ts">
	import { navigating } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Notification from '../../Notification.svelte';
	import InfoCard from './InfoCard.svelte';
	import TasksCard from './TasksCard.svelte';
	import ToDosCards from './ToDosCards.svelte';
	import IntentionsCard from './IntentionsCard.svelte';
	import Menu from './Menu.svelte';
	import { selectedProject } from './stores';

	export let form;
</script>

<div
	in:fade={$navigating?.from?.url.pathname === '/app/session'
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<div class="flex w-full justify-between gap-2 pb-4">
		<Menu />
	</div>
	{#if $selectedProject.id === 0}
		<p>Select a project above</p>
	{:else}
		<div class="grid grid-cols-2 gap-4">
			<InfoCard />
			<TasksCard />
			<ToDosCards />
			<IntentionsCard />
		</div>
	{/if}
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
