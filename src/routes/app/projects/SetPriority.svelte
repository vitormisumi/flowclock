<script lang="ts">
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { priorityColors, priorityOptions } from '$lib/constants/constants';

	export let priority: number;

	let priorityOpen = false;
</script>

<Button size="sm" class="border bg-transparent focus:ring-0 border-{priorityColors[priority]}">
	Priority
</Button>
<Dropdown bind:open={priorityOpen}>
	{#each priorityOptions as option}
		<DropdownItem
			class={priority === option.value ? 'bg-secondary-50' : 'bg-transparent'}
			on:click={() => {
				priority = option.value;
				priorityOpen = false;
			}}
		>
			{option.name}
		</DropdownItem>
	{/each}
</Dropdown>
