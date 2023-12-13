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
	import { priorityOptions, dateFormat, priorityColors } from '$lib/constants/constants';
	import { selectedProjectId } from './stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Writable } from 'svelte/store';

	const settings: Writable<Settings> = getContext('settings');
	const projects: Writable<Project[]> = getContext('projects');

	export let toDo: ToDo;

	let date: Date;

	let openDate = false;

	let projectOptions: { name: string; value: number }[] = [];

	$: projectOptions = $projects.map((x) => {
		return { name: x.name, value: x.id };
	});

	$: projectValue = projectOptions.find((x) => x.value === toDo.project_id)?.value;

	let priority: number = toDo.priority;

	let priorityOpen = false;

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
			$selectedProjectId = Number(formData.get('project_id'));
			update();
		};
	};
</script>

<Button
	size="xs"
	class="rounded-lg bg-transparent px-3 py-1.5 transition-colors hover:bg-primary-700"
	on:click={() => (open = true)}
>
	<i class="fa-solid fa-pen text-primary-50" />
</Button>
<Tooltip placement="left">Edit to-do</Tooltip>
<Modal
	bind:open
	outsideclose
	size="sm"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<p class="text-lg font-bold text-secondary-50">Edit to-do {toDo.name}</p>
	<form
		class="flex flex-col gap-2 text-left"
		method="POST"
		action="?/editToDo"
		use:enhance={handleClick}
	>
		<div class="flex flex-wrap">
			<Input
				name="name"
				placeholder="Task name"
				value={toDo.name}
				class="border-0 bg-transparent text-xl text-secondary-50 placeholder:text-secondary-500"
				required
			></Input>
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
			value={toDo.description}
			class="border-0 bg-transparent text-secondary-200 placeholder:text-secondary-500"
		></Textarea>
		<input type="number" name="id" hidden value={toDo.id} />
		<div class="flex justify-between">
			<div>
				<Button
					size="sm"
					disabled={loading}
					class="border bg-transparent border-{priorityColors[priority]}"
				>
					Priority
				</Button>
				<Dropdown bind:open={priorityOpen}>
					{#each priorityOptions as option}
						<DropdownItem
							class={priority === option.value ? 'bg-secondary-50' : 'bg-transparent'}
							on:click={() => {
								priority = option.value;
								priorityOpen = false;
							}}
						>
							{option.name}
						</DropdownItem>
					{/each}
				</Dropdown>
				<Button size="sm" class="border bg-transparent" on:click={() => (openDate = !openDate)}>
					Due {date && !openDate
						? dateFromTimestamp(String(date), $settings.date_format, $settings.separator)
						: ''}
				</Button>
				{#if openDate}
					<div class="top-50 right-50 fixed">
						<DateInput
							visible
							format={dateFormat[$settings.date_format]}
							min={new Date()}
							max={new Date(String(new Date().getFullYear() + 10))}
							bind:value={date}
							on:select={() => (openDate = false)}
						/>
					</div>
				{/if}
			</div>
			<div class="flex justify-center gap-1">
				<Button size="sm" on:click={() => (open = false)}>Cancel</Button>
				<Button
					size="sm"
					type="submit"
					class="self-center bg-accent-500 transition-colors hover:bg-accent-600"
				>
					<i class="fa-solid fa-save pr-2" />Save
				</Button>
			</div>
		</div>
	</form>
</Modal>
