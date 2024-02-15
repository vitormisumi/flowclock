<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input, Popover, Select, Textarea, Toggle } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let group: ProjectGroup;

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

	let tasks: boolean = true;
	let toDos: boolean;
	let intentions: boolean;

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

<Button
	size="xs"
	buttonStyle="add"
	class="hover:bg-secondary-100/50 hover:dark:bg-secondary-700/50"
	on:click={() => (open = true)}
>
	<i class="fa-solid fa-plus pr-2" />new project
</Button>
<Modal bind:open outsideclose size="sm">
	<h2 class="text-lg font-bold text-primary-900 dark:text-primary-50">New project</h2>
	<form
		class="flex flex-col gap-2 text-left"
		method="POST"
		action="?/add"
		use:enhance={handleClick}
	>
		<Input
			name="name"
			placeholder="Project name"
			class="border-0 bg-transparent text-lg dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
			required
		></Input>
		<div class="flex place-items-start">
			<Input
				name="goal"
				placeholder="Project goal"
				class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
			></Input>
			<Textarea
				name="description"
				placeholder="Description"
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
			placeholder="Project status..."
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
			required
		></Select>
		<Select
			items={groupOptions}
			name="group_id"
			placeholder="Project group..."
			value={group.id}
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
		/>
		<Button type="submit" buttonStyle="accent" class="w-fit self-center">
			<i class="fa-solid fa-save pr-2" />Save new project
		</Button>
	</form>
</Modal>
