<script lang="ts">
	import {
		Button,
		Tooltip,
		Input,
		Modal,
		Dropdown,
		DropdownItem,
		Textarea,
		Select
	} from 'flowbite-svelte';
	import { DateInput } from 'date-picker-svelte';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import { dateFromTimestamp } from '$lib/functions/functions';
	import { selectedProjectId } from './stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Project, Task } from '../types';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../types';

	const settings: Writable<Settings> = getContext('settings');
	const projects: Writable<Project[]> = getContext('projects');

	export let task: Task;

	let date: Date;

	const dateFormat: { [key: string]: string } = {
		ddmmyyyy: 'dd-MM-yyyy',
		mmddyyyy: 'MM-dd-yyyy',
		yyyymmdd: 'yyyy-MM-dd',
		ddmmyy: 'dd-MM-yy',
		mmddyy: 'MM-dd-yy',
		yymmdd: 'yy-MM-dd'
	};

	let openDate = false;

    let projectOptions: { name: string; value: number }[] = [];

    $: projectOptions = $projects.map((x) => {
		return { name: x.name, value: x.id };
	});

    $: projectValue = projectOptions.find((x) => x.value === task.project_id)?.value;

	let priority: number = 0;

	const priorityOptions = [
		{
			name: 'High',
			value: 3
		},
		{
			name: 'Medium',
			value: 2
		},
		{
			name: 'Low',
			value: 1
		},
		{
			name: 'None',
			value: 0
		}
	];

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.append('priority', String(priority));
		if (date) {
			formData.append('due_date', date.toISOString());
		}
		return async ({ update }) => {
			open = false;
			loading = false;
			$selectedProjectId = Number(formData.get('project_id'))
			update();
		};
	};
</script>

<Button size="xs" class="bg-transparent hover:bg-primary-700" on:click={() => (open = true)}
	><i class="fa-solid fa-pen text-primary-50" /></Button
>
<Tooltip placement="left">Edit task</Tooltip>
<Modal
	bind:open
	outsideclose
	size="sm"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<p class="text-lg font-bold text-secondary-50">Edit task {task.name}</p>
	<form
		class="flex flex-col gap-2 text-left"
		method="POST"
		action="?/editTask"
		use:enhance={handleClick}
	>
		<div class="flex flex-wrap">
			<Input
				name="name"
				placeholder="Task name"
				value={task.name}
				class="border-0 bg-transparent text-xl text-secondary-50 placeholder:text-secondary-500"
				required><i class="fa-solid fa-file-signature" aria-hidden="true" slot="left" /></Input
			>
			<Select
				items={projectOptions}
				name="project_id"
				placeholder="Project..."
                value={projectValue}
				class="border-0 bg-transparent text-secondary-200 placeholder:text-secondary-500"
				required
			/>
		</div>
		<Textarea
			name="description"
			placeholder="Description"
			value={task.description}
			class="border-0 bg-transparent text-secondary-200 placeholder:text-secondary-500"
		></Textarea>
		<input type="number" name="id" hidden value={task.id} />
		<div class="flex justify-between">
			<div>
				<Button size="sm" disabled={loading}>Priority {priority}</Button>
				<Dropdown>
					{#each priorityOptions as option}
						<DropdownItem
							class={priority === option.value ? 'bg-secondary-50' : 'bg-transparent'}
							on:click={() => (priority = option.value)}>{option.name}</DropdownItem
						>
					{/each}
				</Dropdown>
				<Button size="sm" on:click={() => (openDate = true)}>
					Due {date && !openDate
						? dateFromTimestamp(String(date), $settings.date_format, $settings.separator)
						: ''}
				</Button>
				{#if openDate}
					<DateInput
						closeOnSelection
						visible
						format={dateFormat[$settings.date_format]}
						min={new Date()}
						max={new Date(String(new Date().getFullYear() + 10))}
						bind:value={date}
						on:select={() => (openDate = false)}
					/>
				{/if}
			</div>
			<div class="flex justify-center gap-1">
				<Button size="sm" on:click={() => (open = false)}>Cancel</Button>
				<Button size="sm" type="submit" class="self-center bg-accent-500 hover:bg-accent-600"
					><i class="fa-solid fa-save pr-2" />Save</Button
				>
			</div>
		</div>
	</form>
</Modal>
