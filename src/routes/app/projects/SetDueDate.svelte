<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { dateFromTimestamp } from '$lib/functions/functions';
	import type { Writable } from 'svelte/store';
	import DatePicker from 'date-picker-svelte/DatePicker.svelte';

	const settings: Writable<Settings> = getContext('settings');

	export let task: Task | ToDo | null;
	export let size: 'xs' | 'sm' | 'lg' | 'xl' | 'md' | undefined;

	const timezoneOffset = new Date().getTimezoneOffset() * 60000;
	export let dueDate = task?.due_date
		? new Date(new Date(task.due_date).getTime() + timezoneOffset)
		: null;

	let open = false;
</script>

<div>
	<Button {size} class="border bg-transparent focus:ring-0" on:click={() => (open = !open)}>
		Due {dueDate
			? dateFromTimestamp(String(dueDate), $settings.date_format, $settings.separator)
			: ''}
	</Button>
	<Modal
		bind:open
		class="w-fit bg-primary-900 text-center landscape:left-8 landscape:md:left-12"
	>
		<div class="grid justify-center pt-8">
			<DatePicker
				bind:value={dueDate}
				min={new Date()}
				max={new Date(String(new Date().getFullYear() + 10))}
				on:select={() => (open = false)}
			/>
			<Button
				size="xs"
				class="rounded-sm border border-secondary-800 bg-secondary-900 hover:bg-[#141717] focus:ring-0"
				on:click={() => {
					dueDate = null;
					open = false;
				}}
			>
				No date
			</Button>
		</div>
	</Modal>
</div>
