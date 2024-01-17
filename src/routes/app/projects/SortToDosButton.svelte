<script lang="ts">
	import { Button, Dropdown } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { sorting } from './stores';

	let openSort = false;

    function sort(sortBy: string) {
		sorting.sortToDos(sortBy);
	}
</script>

<Button
	size="xs"
	class="bg-transparent transition-colors hover:bg-primary-700"
	id="menu"
	on:click={() => (openSort = true)}
>
	<i class="fa-solid fa-sort" />
</Button>
<Dropdown placement="bottom" class="rounded-lg bg-primary-900 p-1" bind:open={openSort}>
	<form method="POST" action="?/sortToDos" class="flex w-20 flex-col gap-1" use:enhance>
		<Button
			size="xs"
			class="w-full"
			type="submit"
			name="sort"
			value="name"
			on:click={() => sort('name')}>Name</Button
		>
		<Button
			size="xs"
			class="w-full"
			type="submit"
			name="sort"
			value="due_date"
			on:click={() => sort('due_date')}
		>
			Due Date
		</Button>
		<Button
			size="xs"
			class="w-full"
			type="submit"
			name="sort"
			value="priority"
			on:click={() => sort('priority')}
		>
			Priority
		</Button>
	</form>
</Dropdown>
