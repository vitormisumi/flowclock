<script lang="ts">
	import { Radio, Tabs, TabItem } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { session, sessionFocus } from './stores';
	import { windowWidth } from '../stores';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { Writable } from 'svelte/store';

	const projects: Writable<Project[]> = getContext('projects');
	const tasks: Writable<Task[]> = getContext('tasks');
	const intentions: Writable<Intention[]> = getContext('intentions');

	let group: string;

	let open = false;

	let focusName: string | undefined;

	$: switch ($sessionFocus.type) {
		case 'task':
			focusName = $tasks.find((task) => task.id === $sessionFocus.id)?.name;
			break;
		case 'intention':
			focusName = $intentions.find((intention) => intention.id === $sessionFocus.id)?.name;
			break;
		default:
			focusName = undefined;
	}
</script>

<Button
	size={$windowWidth < 768 ? 'xs' : 'md'}
	disabled={$session.running}
	class="overflow-hidden"
	on:click={() => (open = true)}
>
	<span class="truncate">
		{'Focus on: ' + focusName}
	</span>
</Button>
<Modal size="sm" outsideclose bind:open>
	<h2 class="text-md font-medium text-secondary-900 dark:text-secondary-50">Focus on:</h2>
	<Tabs
		style="pill"
		class="flex-nowrap overflow-x-scroll whitespace-nowrap"
		contentClass="bg-transparent dark:bg-transparent"
	>
		{#each $projects as project, i}
			<TabItem
				open={$sessionFocus.projectId
					? project.id === $sessionFocus.projectId
					: i === $sessionFocus.projectId}
				title={project.name}
				activeClasses="bg-primary-500 dark:bg-primary-500 rounded-lg h-full w-full p-3 text-secondary-900 dark:text-secondary-50"
				inactiveClasses="bg-transparent dark:bg-transparent hover:bg-primary-200 hover:dark:bg-primary-700 dark:bg-primary-800 transition-colors rounded-lg h-full w-full p-3 dark:text-secondary-200"
			>
				{#if $tasks.filter((task) => task.project_id === project.id).length > 0}
					<h3 class="text-sm font-bold">Tasks</h3>
				{/if}
				<ul>
					{#each $tasks as task}
						{#if task.project_id === project.id}
							<li class="list-none p-1">
								<Radio
									name="group2"
									value={task.id}
									color="orange"
									class="cursor-pointer rounded-lg border border-transparent p-2 text-primary-900 transition-colors hover:border-accent-500 dark:text-primary-50 hover:dark:border-accent-500"
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
				</ul>
				{#if $intentions.filter((intention) => intention.project_id === project.id).length > 0}
					<h3 class="text-sm font-bold">Intentions</h3>
				{/if}
				<ul>
					{#each $intentions as intention}
						{#if intention.project_id === project.id}
							<li class="list-none p-1">
								<Radio
									name="group3"
									value={intention.id}
									color="orange"
									class="cursor-pointer rounded-lg border border-transparent p-2 text-primary-900 transition-colors hover:border-accent-500 dark:text-primary-50 hover:dark:border-accent-500"
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
				</ul>
				{#if $tasks.filter((task) => task.project_id === project.id).length === 0 && $intentions.filter((intention) => intention.project_id === project.id).length === 0}
					<h3 class="text-sm font-bold">This project has no tasks or intentions</h3>
				{/if}
			</TabItem>
		{/each}
	</Tabs>
</Modal>
