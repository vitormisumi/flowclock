<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { getContext } from "svelte";
    import { dateFromTimestamp } from "$lib/functions/functions";
    import DatePicker from "date-picker-svelte/DatePicker.svelte";
    import type { Writable } from "svelte/store";

    const settings: Writable<Settings> = getContext('settings');

    export let task: Task | ToDo;

    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
	export let dueDate = task.due_date ? new Date(new Date(task.due_date).getTime() + timezoneOffset) : null;

    let openDate = false;
</script>

<Button
	size="sm"
	class="border bg-transparent focus:ring-0"
	on:click={() => (openDate = !openDate)}
>
	Due {dueDate
		? dateFromTimestamp(String(dueDate), $settings.date_format, $settings.separator)
		: ''}
</Button>
{#if openDate}
	<div class="fixed grid">
		<DatePicker
			bind:value={dueDate}
			min={new Date()}
			max={new Date(String(new Date().getFullYear() + 10))}
			on:select={() => (openDate = false)}
		/>
		<Button
			size="xs"
			class="bg-primary-800 focus:ring-0"
			on:click={() => {
				dueDate = null;
				openDate = false;
			}}
		>
			No date
		</Button>
	</div>
{/if}
