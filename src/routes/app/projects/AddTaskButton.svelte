<script lang="ts">
	import { Button, Dropdown, DropdownItem, Input } from 'flowbite-svelte';
	import { DateInput } from 'date-picker-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { slide } from 'svelte/transition';
	import { dateFromTimestamp } from '$lib/functions/functions';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../types';
	import { getContext } from 'svelte';

	const settings: Writable<Settings> = getContext('settings');

	let date: Date;

	const dateFormat: { [key: string]: string } = {
		ddmmyyyy: 'dd-MM-yyyy',
		mmddyyyy: 'MM-dd-yyyy',
		yyyymmdd: 'yyyy-MM-dd',
		ddmmyy: 'dd-MM-yy',
		mmddyy: 'MM-dd-yy',
		yymmdd: 'yy-MM-dd'
	};

	let open = false;

	let openDate = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.append('type', 'task');
		formData.append('status', 'planned');
		formData.append('due_date', date.toISOString());
		return async ({ update }) => {
			loading = false;
			open = false;
			update();
		};
	};
</script>

{#if open}
	<div
		class=" rounded-lg border text-center landscape:left-8 landscape:md:left-12"
		transition:slide
	>
		<form
			class="flex flex-col gap-2 text-left"
			method="POST"
			action="?/addTask"
			use:enhance={handleClick}
		>
			<Input
				name="name"
				placeholder="Task name"
				class="border-0 bg-transparent text-xl text-secondary-50 placeholder:text-secondary-500 focus:ring-0"
				required><i class="fa-solid fa-file-signature" aria-hidden="true" slot="left" /></Input
			>
			<Input
				name="description"
				placeholder="Description"
				class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500 focus:ring-0"
			>
				<i class="fa-solid fa-file-lines" aria-hidden="true" slot="left" />
			</Input>
			<div class="flex justify-between gap-2">
				<div>
					<Button disabled={loading}>Priority</Button>
					<Dropdown>
						<DropdownItem>High</DropdownItem>
						<DropdownItem>Medium</DropdownItem>
						<DropdownItem>Low</DropdownItem>
					</Dropdown>
					<Button on:click={() => (openDate = true)}>
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
				<div>
					<Button disabled={loading} on:click={() => (open = false)}>Cancel</Button>
					<Button type="submit" class="bg-accent-500 hover:bg-accent-600" disabled={loading}>
						Add task
					</Button>
				</div>
			</div>
		</form>
	</div>
{:else}
	<Button size="sm" class="bg-transparent text-secondary-400" on:click={() => (open = true)}
		><i class="fa-solid fa-plus pr-2" />add task</Button
	>
{/if}

<style>
	:root {
		--date-picker-foreground: #ebf7fa;
		--date-picker-background: #10353d;
		--date-picker-highlight-border: transparent;
		--date-picker-highlight-shadow: transparent;
		--date-picker-selected-color: #ebf7fa;
		--date-picker-selected-background: #e35403;
	}
</style>
