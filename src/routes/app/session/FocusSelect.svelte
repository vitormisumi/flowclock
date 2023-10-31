<script lang="ts">
	import { Button, Dropdown, DropdownDivider, Radio, DropdownItem } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { session, sessionFocus } from './stores';
	import type { Writable } from 'svelte/store';

	const projects: Writable<Project[]> = getContext('projects');
	const tasks: Writable<Task[]> = getContext('tasks');
	const intentions: Writable<Intention[]> = getContext('intentions');

	let group: string;

	let open = false;
</script>

<Button disabled={$session.running}>
	{group ? 'Focusing on: ' + $sessionFocus.type + $sessionFocus.id : 'Focus on...'}
</Button>
<Dropdown placement="top" bind:open>
	<div slot="header" class="px-4 py-2">
		<h3 class="text-sm font-bold">Projects</h3>
	</div>
	{#each $projects as project}
		<DropdownItem name="group1" value={project.id}>
			{project.name}<i class="fa-solid fa-chevron-right pl-2" />
		</DropdownItem>
		<Dropdown placement="right-end">
			{#if $tasks.filter((task) => task.project_id === project.id).length > 0}
				<div class="px-4 py-2">
					<h3 class="text-sm font-bold">Tasks</h3>
				</div>
			{/if}
			{#each $tasks as task}
				{#if task.project_id === project.id}
					<li>
						<Radio
							name="group2"
							bind:group
							value={task.id}
							on:click={() => {
								sessionFocus.set('task', task.id)
								open = false;
							}}
							>{task.name}
						</Radio>
					</li>
				{/if}
			{/each}
			{#if $intentions.filter((intention) => intention.project_id === project.id).length > 0}
				<DropdownDivider />
				<div class="px-4 py-2">
					<h3 class="text-sm font-bold">Intentions</h3>
				</div>
				<DropdownDivider />
			{/if}
			{#each $intentions as intention}
				{#if intention.project_id === project.id}
					<li>
						<Radio
							name="group3"
							bind:group
							value={intention.id}
							on:click={() => {
								sessionFocus.set('intention', intention.id)
								open = false;
							}}
							>{intention.name}
						</Radio>
					</li>
				{/if}
			{/each}
			{#if $tasks.filter((task) => task.project_id === project.id).length === 0 && $intentions.filter((intention) => intention.project_id === project.id).length === 0}
				<div class="px-4 py-2">
					<h3 class="text-sm font-bold">This project has no tasks or intentions</h3>
				</div>
			{/if}
		</Dropdown>
	{/each}
</Dropdown>
