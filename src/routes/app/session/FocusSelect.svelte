<script lang="ts">
	import { Radio, Tabs, TabItem, Popover } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { session, sessionFocus } from './stores';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { Writable } from 'svelte/store';

	const projects: Writable<Project[]> = getContext('projects');
	const tasks: Writable<Task[]> = getContext('tasks');
	const intentions: Writable<Intention[]> = getContext('intentions');

	let name: string | undefined;

	$: switch ($sessionFocus.type) {
		case 'task':
			name = $tasks.find((task) => task.id === $sessionFocus.id)?.name;
			break;
		case 'intention':
			name = $intentions.find((intention) => intention.id === $sessionFocus.id)?.name;
	}

	let group: string;

	let open = false;
</script>

<Button disabled={$session.running} class="w-full overflow-hidden" on:click={() => (open = true)}>
	<span class="truncate">
		{$session.running || group ? 'Focus on: ' + name : 'Focus on...'}
	</span>
</Button>
{#if $session.running}
	<Popover class="max-w-md bg-primary-50 dark:bg-primary-900">
		<p class="text-sm font-light text-primary-900 dark:text-primary-50">
			FlowClock sessions are designed to help you stay focused on one task at a time. If you finish
			your task and want to move on to a new one, simply complete the current session, select a new
			task, and start a new session.
		</p>
	</Popover>
{/if}
<Modal size="sm" outsideclose class="h-96" bind:open>
	<h2 class="text-md font-medium text-primary-900 dark:text-primary-50">Focus on:</h2>
	<Tabs style="pill" class="flex-nowrap overflow-x-scroll whitespace-nowrap">
		{#each $projects as project, i}
			<TabItem
				open={$sessionFocus.projectId
					? project.id === $sessionFocus.projectId
					: i === $sessionFocus.projectId}
				title={project.name}
				activeClasses="bg-primary-200 dark:bg-primary-700 rounded-lg h-full w-full p-3 text-primary-900 dark:text-primary-50"
				inactiveClasses="bg-transparent dark:bg-transparent hover:bg-primary-100 dark:bg-primary-800 transition-colors rounded-lg h-full w-full p-3 dark:text-secondary-200"
			>
				{#if $tasks.filter((task) => task.project_id === project.id).length > 0}
					<h3 class="text-sm font-bold">Tasks</h3>
				{/if}
				{#each $tasks as task}
					{#if task.project_id === project.id}
						<li class="list-none p-1">
							<Radio
								name="group2"
								value={task.id}
								color="orange"
								class="cursor-pointer rounded-lg border border-transparent p-2 text-primary-900 transition-colors dark:text-primary-50 hover:dark:border-accent-500"
								bind:group
								on:click={() => {
									sessionFocus.set('task', task.id, task.project_id);
									open = false;
								}}
								>{task.name}
							</Radio>
						</li>
					{/if}
				{/each}
				{#if $intentions.filter((intention) => intention.project_id === project.id).length > 0}
					<h3 class="text-sm font-bold">Intentions</h3>
				{/if}
				{#each $intentions as intention}
					{#if intention.project_id === project.id}
						<li class="list-none p-1">
							<Radio
								name="group3"
								value={intention.id}
								color="orange"
								class="cursor-pointer rounded-lg border border-transparent p-2 text-primary-900 transition-colors dark:text-primary-50 hover:dark:border-accent-500"
								bind:group
								on:click={() => {
									sessionFocus.set('intention', intention.id, intention.project_id);
									open = false;
								}}
								>{intention.name}
							</Radio>
						</li>
					{/if}
				{/each}
				{#if $tasks.filter((task) => task.project_id === project.id).length === 0 && $intentions.filter((intention) => intention.project_id === project.id).length === 0}
					<h3 class="text-sm font-bold">This project has no tasks or intentions</h3>
				{/if}
			</TabItem>
		{/each}
	</Tabs>
</Modal>
