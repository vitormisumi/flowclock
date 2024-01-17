<script lang="ts">
	import { Card, Popover } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import TasksBoard from './TasksBoard.svelte';
	import TasksMenu from './TasksMenu.svelte';
	import type { Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	const settings: Writable<Settings> = getContext('settings');

	export let open: boolean;

	let hidden = $settings.tasks_card_hidden;
</script>

<Card class="grid h-full min-h-full min-w-full gap-1 border-0 bg-primary-800">
	<div class="flex items-center justify-between">
		<div class="flex items-center">
			<h2 class="pr-1 font-bold text-primary-50">Tasks</h2>
			<i class="fa-regular fa-circle-question right-0 top-0 text-secondary-500" id="hover-2" />
			<Popover triggeredBy="#hover-2" class="z-10 w-60 md:w-80" placement="bottom-start">
				<div class="p-2 text-sm">
					<h3 class="font-semibold text-secondary-900">Extended Assignments</h3>
					Tasks are the ideal choice for assignments that require a substantial time commitment and might
					involve multiple stages of completion. You can think of tasks as your go-to for managing projects
					that span an extended period, like preparing a comprehensive research report or organizing
					a major event. Tasks can be linked to sessions to conveniently track the time you spend on
					each one, helping you stay organized and efficient in managing your workload.
				</div>
			</Popover>
		</div>
		<TasksMenu bind:open bind:hidden />
	</div>
	{#if !hidden}
		<div class="overflow-hidden" transition:slide>
			<div>
				<TasksBoard />
			</div>
		</div>
	{/if}
</Card>
