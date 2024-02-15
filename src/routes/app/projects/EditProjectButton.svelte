<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input, Select, Textarea, Toggle, Popover } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { canHover } from '../stores';
	import { selectedProject } from './stores';

	const projectGroups: Writable<ProjectGroup[]> = getContext('projectGroups');

	let open = false;

	let statusOptions = [
		{ name: 'idea', value: 'idea' },
		{ name: 'planning', value: 'planning' },
		{ name: 'on going', value: 'on going' },
		{ name: 'completed', value: 'completed' },
		{ name: 'suspended', value: 'suspended' },
		{ name: 'cancelled', value: 'cancelled' }
	];

	let groupOptions: { name: string; value: number }[] = [];

	$: groupOptions = $projectGroups.map((x) => {
		return { name: x.name, value: x.id };
	});

	$: groupValue = groupOptions.find((x) => x.value === $selectedProject.group_id)?.value;

	let tasks = $selectedProject.tasks;
	let toDos = $selectedProject.to_dos;
	let intentions = $selectedProject.intentions;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('tasks', String(tasks));
		formData.append('to_dos', String(toDos));
		formData.append('intentions', String(intentions));
		return async ({ update }) => {
			open = false;
			update();
		};
	};
</script>

<Button size="xs" buttonStyle="menu" on:click={() => (open = true)}>
	<i class="fa-solid fa-pen text-primary-900 dark:text-primary-50" />
</Button>
{#if $canHover}
	<Tooltip placement="left">Edit project</Tooltip>
{/if}
<Modal bind:open outsideclose size="sm">
	<p class="text-lg font-bold dark:text-secondary-50">Edit project {$selectedProject.name}</p>
	<form
		class="flex flex-col gap-2 text-left"
		method="POST"
		action="?/edit"
		use:enhance={handleClick}
	>
		<Input
			name="name"
			placeholder="Project name"
			value={$selectedProject.name}
			class="border-0 bg-transparent text-xl dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
			required
		></Input>
		<div class="flex place-items-start">
			<Input
				name="goal"
				placeholder="Project goal"
				value={$selectedProject.goal}
				class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
			></Input>
			<Textarea
				name="description"
				placeholder="Description"
				value={$selectedProject.description}
				class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
			></Textarea>
		</div>
		<div class="flex items-center gap-2">
			<Toggle size="small" bind:checked={tasks}>Tasks</Toggle>
			<i class="fa-solid fa-question-circle" />
			<Popover
				class="z-10 w-60 border-none bg-secondary-200 dark:bg-secondary-700 md:w-80"
				placement="right"
			>
				<div class="p-2 text-sm text-secondary-900 dark:text-secondary-50">
					<h3 class="font-semibold">Extended Assignments</h3>
					Tasks are the ideal choice for assignments that require a substantial time commitment and might
					involve multiple stages of completion. You can think of tasks as your go-to for managing projects
					that span an extended period, like preparing a comprehensive research report or organizing
					a major event. Tasks can be linked to sessions to conveniently track the time you spend on
					each one, helping you stay organized and efficient in managing your workload.
				</div>
			</Popover>
		</div>
		<div class="flex items-center gap-2">
			<Toggle size="small" bind:checked={toDos}>To-Dos</Toggle>
			<i class="fa-solid fa-circle-question" />
			<Popover
				class="z-10 w-60 border-none bg-secondary-200 dark:bg-secondary-700 md:w-80"
				placement="right"
			>
				<div class="p-2 text-sm text-secondary-900 dark:text-secondary-50">
					<h3 class="font-semibold">Quick Duties</h3>
					To-Dos are designed for swift and straightforward assignments. In this context, the focus is
					on completing the task rather than tracking the time it takes to finish. Unlike Tasks, To-Dos
					cannot be time tracked. If you require time tracking, consider creating a 'Task' instead. To-Dos
					are more suited to things like small steps within a checklist, chores or quick errands.
				</div>
			</Popover>
		</div>
		<div class="flex items-center gap-2">
			<Toggle size="small" bind:checked={intentions}>Intentions</Toggle>
			<i class="fa-solid fa-circle-question" />
			<Popover
				class="z-10 w-60 border-none bg-secondary-200 dark:bg-secondary-700 md:w-80"
				placement="right"
			>
				<div class="p-2 text-sm text-secondary-900 dark:text-secondary-50">
					<h3 class="font-semibold">Lifetime Goals</h3>
					Intentions are your tool for continuous self-improvement and long-term objectives. Just like
					Tasks, you can track the time you invest in each Intention, helping you measure your progress
					over time, but what sets them apart is that Intentions don't have a specific due date. They're
					perfect for lifelong pursuits like learning a new language or mastering a musical instrument.
				</div>
			</Popover>
		</div>
		<Select
			items={statusOptions}
			name="status"
			placeholder="Select status..."
			value={$selectedProject.status}
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
			required
		/>
		<Select
			items={groupOptions}
			name="group_id"
			placeholder="Select group..."
			value={groupValue}
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
		/>
		<input type="number" name="id" hidden value={$selectedProject.id} />
		<Button
			type="submit"
			class="self-center transition-colors dark:bg-accent-500 hover:dark:bg-accent-600"
		>
			<i class="fa-solid fa-save pr-2" />Save
		</Button>
	</form>
</Modal>
