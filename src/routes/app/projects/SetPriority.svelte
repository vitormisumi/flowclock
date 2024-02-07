<script lang="ts">
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { priorityOptions } from '$lib/constants/constants';
	import Button from '$lib/components/Button.svelte';
	import { priorityColor } from '$lib/functions/functions';

	export let priority: '0' | '1' | '2' | '3';
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
</script>

<Button {size} buttonStyle="transparent" class="border {priorityColor(priority, 'border')}">
	<i class="fa-solid fa-flag text-secondary-900 dark:text-secondary-50" />
</Button>
<Dropdown class="rounded-md py-2 bg-secondary-200 dark:bg-secondary-700" placement="top">
	{#each priorityOptions as option}
		<DropdownItem
			class="hover:bg-secondary-100 hover:dark:bg-secondary-800 {priorityColor(
				option.value,
				'text'
			)} {priority === option.value
				? 'bg-secondary-50 dark:bg-secondary-900'
				: 'bg-transparent dark:bg-transparent'}"
			on:click={() => {
				priority = option.value;
			}}
		>
			{option.name}
		</DropdownItem>
	{/each}
</Dropdown>
