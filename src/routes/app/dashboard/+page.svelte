<script lang="ts">
	import { navigating } from '$app/stores';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import Notification from '../../Notification.svelte';
	import Clock from '../Clock.svelte';
	import Filter from './Filter.svelte';
	import FocusCard from './FocusCard.svelte';
	import InterruptionsCard from './InterruptionsCard.svelte';
	import ProjectsCard from './ProjectsCard.svelte';
	import TimeFrameCard from './TimeFrameCard.svelte';

	export let form;

	const sessions: Writable<UserSession[]> = getContext('sessions');
</script>

<div
	class="fixed top-0 w-screen scale-50 landscape:left-8 landscape:md:left-12"
	in:fade={$navigating?.from?.url.pathname === '/app/session'
		? { duration: 500 }
		: { duration: 0 }}
>
	<Clock />
</div>
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
		<FocusCard />
		<ProjectsCard />
		<TimeFrameCard />
		<InterruptionsCard />
	</div>
{/if}
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
