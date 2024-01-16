<script lang="ts">
	import { Button, Dropdown } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { dateFromTimestamp } from '$lib/functions/functions';
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

<Button {size} class="border bg-transparent focus:ring-0">
	<div class="flex h-3 place-items-center gap-2">
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
<Dropdown class="bg-primary-900" placement="top">
	<div class="grid">
		<DatePicker
			bind:value={dueDate}
			min={new Date()}
			max={new Date(String(new Date().getFullYear() + 10))}
		/>
		<Button
			size="xs"
			class="rounded-sm border border-secondary-800 bg-secondary-900 hover:bg-[#141717] focus:ring-0"
			on:click={() => {
				dueDate = null;
			}}
		>
			No date
		</Button>
	</div>
</Dropdown>
