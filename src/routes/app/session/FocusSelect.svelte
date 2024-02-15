<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Radio from '$lib/components/Radio.svelte';
	import { Dropdown, DropdownDivider, DropdownItem } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { canHover } from '../stores';
	import { sessionFocus } from './stores';

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
	size={!$canHover ? 'xs' : 'md'}
	buttonStyle="menu"
	class="w-full bg-secondary-200 dark:bg-secondary-700"
>
	<span class="truncate">
		Focus on: {focusName ?? ''}
	</span>
</Button>
<Dropdown
	placement="top"
	class="max-h-60 w-60 max-w-xs overflow-y-scroll rounded-b-md bg-secondary-200 text-secondary-900 dark:bg-secondary-700 dark:text-secondary-50"
	containerClass=""
	headerClass="bg-secondary-200 dark:bg-secondary-700 rounded-t-md"
	bind:open
>
	<div slot="header" class="px-4 py-2 text-sm font-bold text-secondary-900 dark:text-secondary-50">
		<p>Projects</p>
	</div>
	{#each $projects as project, i}
		<DropdownItem
			class="flex place-items-center justify-center gap-2 hover:bg-secondary-100 hover:dark:bg-secondary-800"
		>
			{project.name}
		</DropdownItem>
		<Dropdown
			placement="top"
			class="max-h-60 w-60 max-w-xs overflow-x-clip overflow-y-scroll rounded-md bg-secondary-200 p-2 text-secondary-900 dark:bg-secondary-700 dark:text-secondary-50 md:w-96"
		>
			{#if $tasks.filter((task) => task.project_id === project.id).length > 0}
				<h3 class="px-4 py-2 text-sm font-bold">Tasks</h3>
			{/if}
			<ul>
				{#each $tasks as task}
					{#if task.project_id === project.id}
						<li class="list-none">
							<Radio
								value={task.id}
								bind:group
								on:click={() => sessionFocus.set('task', task.id, task.project_id)}
							>
								{task.name}
							</Radio>
						</li>
					{/if}
				{/each}
			</ul>
			{#if $intentions.filter((intention) => intention.project_id === project.id).length > 0}
				<DropdownDivider />
				<h3 class="px-4 py-2 text-sm font-bold">Intentions</h3>
			{/if}
			<ul>
				{#each $intentions as intention}
					{#if intention.project_id === project.id}
						<li class="list-none">
							<Radio
								value={intention.id}
								bind:group
								on:click={() => sessionFocus.set('intention', intention.id, intention.project_id)}
							>
								{intention.name}
							</Radio>
						</li>
					{/if}
				{/each}
			</ul>
			{#if $tasks.filter((task) => task.project_id === project.id).length === 0 && $intentions.filter((intention) => intention.project_id === project.id).length === 0}
				<h3 class="px-4 py-2 text-sm font-bold">This project has no tasks or intentions</h3>
			{/if}
		</Dropdown>
	{/each}
	<DropdownDivider />
	<div class="px-1">
		<Button
			size="sm"
			buttonStyle="transparent"
			class="w-full rounded-md text-secondary-900 hover:bg-secondary-100 focus:ring-0 dark:text-secondary-50 hover:dark:bg-secondary-800"
			on:click={() => {
				sessionFocus.reset();
				open = false;
			}}
		>
			No focus
		</Button>
	</div>
</Dropdown>
