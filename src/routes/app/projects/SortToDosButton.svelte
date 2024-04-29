<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Dropdown } from 'flowbite-svelte';
	import { canHover } from '../stores';
	import { sorting } from './stores';

	export let open: boolean;

	const handleClick: SubmitFunction = ({ formData }) => {
		const sortBy = String(formData.get('sort'));
		open = false;
		sorting.sortToDos(sortBy);
	};
</script>

<Button id="sort" size="xs" buttonStyle="menu">
	<iconify-icon icon="ion:filter" />
</Button>
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
{#if $canHover}
	<Tooltip placement="left" triggeredBy="#sort">Sort to-dos</Tooltip>
{/if}
