<script lang="ts">
	import { Dropdown, Tooltip } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { sorting } from './stores';
	import Button from '$lib/components/Button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { windowWidth } from '../stores';

	export let open: boolean;

	const handleClick: SubmitFunction = ({ formData }) => {
		const sortBy = String(formData.get('sort'));
		open = false;
		sorting.sortToDos(sortBy);
	};
</script>

<Button id="sort" size="xs" buttonStyle="menu"><i class="fa-solid fa-sort" /></Button>
<Dropdown placement="left-start" class="rounded-lg bg-secondary-200 p-1 dark:bg-secondary-700">
	<form
		method="POST"
		action="?/sortToDos"
		class="flex w-20 flex-col gap-1"
		use:enhance={handleClick}
	>
		<Button size="xs" buttonStyle="menu" class="w-full" type="submit" name="sort" value="name">
			Name
		</Button>
		<Button size="xs" buttonStyle="menu" class="w-full" type="submit" name="sort" value="due_date">
			Due Date
		</Button>
		<Button size="xs" buttonStyle="menu" class="w-full" type="submit" name="sort" value="priority">
			Priority
		</Button>
	</form>
</Dropdown>
{#if $windowWidth >= 768}
	<Tooltip placement="left" triggeredBy="#sort" class="bg-secondary-400 dark:bg-secondary-800">
		Sort to-dos
	</Tooltip>
{/if}
