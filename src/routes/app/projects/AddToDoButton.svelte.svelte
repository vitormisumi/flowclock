<script lang="ts">
	import { Button, Dropdown, DropdownItem, Input, Textarea } from 'flowbite-svelte';
	import { DatePicker } from 'date-picker-svelte';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { dateFromTimestamp } from '$lib/functions/functions';
	import { priorityOptions } from '$lib/constants/constants';
	import { getContext } from 'svelte';
	import { selectedProject } from './stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Writable } from 'svelte/store';

	const settings: Writable<Settings> = getContext('settings');

	let date: Date;

	let priority: number = 0;

	let open = false;

	let openDate = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.append('project_id', String($selectedProject.id));
		formData.append('priority', String(priority));
		if (date) {
			formData.append('due_date', date.toISOString());
		}
		return async ({ update }) => {
			loading = false;
			open = false;
			update();
		};
	};
</script>

{#if open}
	<div
		class="rounded-lg bg-primary-900 p-4 text-center landscape:left-8 landscape:md:left-12"
		transition:slide
	>
		<form
			class="flex flex-col gap-1 text-left"
			method="POST"
			action="?/addToDo"
			use:enhance={handleClick}
		>
			<Input
				name="name"
				placeholder="To-Do"
				class="border-0 bg-transparent text-lg text-secondary-50 placeholder:text-secondary-500 focus:ring-0"
				required
			></Input>
			<Textarea
				name="description"
				placeholder="Description"
				class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500 focus:ring-0"
			></Textarea>
			<div class="flex justify-between gap-2">
				<div>
					<Button size="xs" disabled={loading}>Priority {priority}</Button>
					<Dropdown>
						{#each priorityOptions as option}
							<DropdownItem
								class={priority === option.value ? 'bg-secondary-50' : 'bg-transparent'}
								on:click={() => (priority = option.value)}>{option.name}</DropdownItem
							>
						{/each}
					</Dropdown>
					<Button size="xs" on:click={() => (openDate = true)}>
						Due {date && !openDate
							? dateFromTimestamp(String(date), $settings.date_format, $settings.separator)
							: ''}
					</Button>
					{#if openDate}
						<div class="fixed">
							<DatePicker
								min={new Date()}
								max={new Date(String(new Date().getFullYear() + 10))}
								bind:value={date}
								on:select={() => (openDate = false)}
							/>
						</div>
					{/if}
				</div>
				<div>
					<Button size="xs" disabled={loading} on:click={() => (open = false)}>Cancel</Button>
					<Button
						size="xs"
						type="submit"
						class="bg-accent-500 transition-colors hover:bg-accent-600"
						disabled={loading}
					>
						Add To-Do
					</Button>
				</div>
			</div>
		</form>
	</div>
{:else}
	<Button
		size="xs"
		class="bg-transparent text-secondary-400 transition-colors hover:bg-transparent hover:text-secondary-200"
		on:click={() => (open = true)}><i class="fa-solid fa-plus pr-2" />add to-do</Button
	>
{/if}
