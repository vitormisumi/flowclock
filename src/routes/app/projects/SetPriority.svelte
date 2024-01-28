<script lang="ts">
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import {
		lightPriorityColors,
		darkPriorityColors,
		priorityOptions
	} from '$lib/constants/constants';

	export let priority: number | null;
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;

	function borderColor(priority: number | null) {
		if (priority) {
			return (
				'border-' + lightPriorityColors[priority] + 'dark:border-' + darkPriorityColors[priority]
			);
		} else {
			return 'border-white';
		}
	}
</script>

<Button
	{size}
	class="border bg-transparent focus:ring-0 dark:bg-transparent {borderColor(priority)}"
>
	<i class="fa-solid fa-flag"> </i></Button
>
<Dropdown>
	{#each priorityOptions as option}
		<DropdownItem
			class={priority === option.value
				? 'dark:bg-secondary-50'
				: 'bg-transparent dark:bg-transparent'}
			on:click={() => {
				priority = option.value;
			}}
		>
			{option.name}
		</DropdownItem>
	{/each}
</Dropdown>
