<script lang="ts">
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { priorityColors, priorityOptions } from '$lib/constants/constants';

	export let priority: number | null;
    export let size: "xs" | "sm" | "lg" | "xl" | "md" | undefined;

	let priorityOpen = false;
</script>

<Button {size} class="border bg-transparent focus:ring-0 border-{priority ? priorityColors[priority] : 'white'}">
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
