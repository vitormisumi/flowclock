<script lang="ts">
	import { Dropdown } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { dateFromTimestamp } from '$lib/functions/functions';
	import Button from '$lib/components/Button.svelte';
	import DatePicker from 'date-picker-svelte/DatePicker.svelte';
	import type { Writable } from 'svelte/store';

	const settings: Writable<Settings> = getContext('settings');

	export let task: Task | ToDo | null;
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;

	const timezoneOffset = new Date().getTimezoneOffset() * 60000;
	export let dueDate = task?.due_date
		? new Date(new Date(task.due_date).getTime() + timezoneOffset)
		: null;
</script>

<Button {size} buttonStyle="transparent" class="border-secondary-900 dark:border-secondary-50 {dueDate ? size === 'xs' ? 'w-28' : 'w-32' : 'w-auto'}">
	<div class="flex h-3 place-items-center gap-2 text-secondary-900 dark:text-secondary-50">
		<i class="fa-solid fa-calendar" />
		{#if dueDate}
			<p>
				{dueDate
					? dateFromTimestamp(String(dueDate), $settings.date_format, $settings.separator)
					: ''}
			</p>
		{/if}
	</div>
</Button>
<Dropdown class="rounded-md bg-secondary-100 p-1 dark:bg-secondary-800" placement="top">
	<div class="grid gap-1">
		<DatePicker
			bind:value={dueDate}
			min={new Date()}
			max={new Date(String(new Date().getFullYear() + 10))}
		/>
		<Button
			size="xs"
			class="rounded-sm border bg-secondary-500 text-secondary-50 hover:bg-secondary-400 focus:ring-0 dark:bg-secondary-500 dark:text-secondary-50"
			on:click={() => {
				dueDate = null;
			}}
		>
			No date
		</Button>
	</div>
</Dropdown>

<style>
	:root {
		--date-picker-foreground: #f1f3f4;
		--date-picker-background: #677a7e;
		--date-picker-highlight-border: transparent;
		--date-picker-highlight-shadow: transparent;
		--date-picker-selected-color: #f1f3f4;
		--date-picker-selected-background: #1B5865;
	}
</style>
