<script lang="ts">
	import { Button, Dropdown, DropdownItem, Tooltip } from 'flowbite-svelte';
	import { priorityColors, priorityOptions } from '$lib/constants/constants';

	export let priority: number | null;
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
</script>

<Button
	{size}
	class="border bg-transparent focus:ring-0 border-{priority ? priorityColors[priority] : 'white'}"
>
	<i class="fa-solid fa-flag"> </i></Button
>
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
