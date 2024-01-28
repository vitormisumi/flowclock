<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import Filter from './Filter.svelte';
	import SessionsCard from './SessionsCard.svelte';
	import Notification from '../../Notification.svelte';
	import InterruptionsCard from './InterruptionsCard.svelte';
	import TimeFrameCard from './TimeFrameCard.svelte';
	import ProjectsCard from './ProjectsCard.svelte';
	import type { Writable } from 'svelte/store';

	export let form;

	const sessions: Writable<UserSession[]> = getContext('sessions');
</script>

<div
	in:fade={$navigating?.from?.url.pathname === '/app/session'
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	{#if $sessions.length === 0}
		<div class="absolute inset-0 flex items-center justify-center">
			<p class="text-center text-lg dark:text-secondary-100">
				You have no sessions yet. <br />Complete your first session to start analysing your data.
			</p>
		</div>
	{:else}
		<div class="flex justify-end pb-4">
			<Filter />
		</div>
		<div class="grid place-items-start gap-4 lg:grid-cols-2">
			<SessionsCard />
			<ProjectsCard />
			<TimeFrameCard />
			<InterruptionsCard />
		</div>
	{/if}
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
