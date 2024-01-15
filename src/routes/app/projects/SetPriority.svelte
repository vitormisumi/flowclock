<script lang="ts">
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { priorityColors, priorityOptions } from '$lib/constants/constants';

	export let priority: number | null;
</script>

<Button
	size="sm"
	class="border bg-transparent focus:ring-0 border-{priority ? priorityColors[priority] : 'white'}"
>
	Priority
</Button>
<Dropdown>
	{#each priorityOptions as option}
		<DropdownItem
			class={priority === option.value ? 'bg-secondary-50' : 'bg-transparent'}
			on:click={() => {
				priority = option.value;
			}}
		>
			{option.name}
		</DropdownItem>
	{/each}
</Dropdown>
