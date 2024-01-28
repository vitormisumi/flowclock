<script lang="ts">
	import { Dropdown, DropdownDivider } from 'flowbite-svelte';
	import Button from '$lib/components/Button.svelte';
	import HideToDosButton from './HideToDosButton.svelte';
	import SortToDosButton from './SortToDosButton.svelte';
	import HideCompletedToDosButton from './HideCompletedToDosButton.svelte';

	export let open: boolean;
	export let hidden: boolean;
	export let completedHidden: boolean;
</script>

<Button size="xs" buttonStyle="menu"><i class="fa-solid fa-ellipsis-vertical" /></Button>
<Dropdown
	placement="bottom"
	class="flex flex-col justify-items-center rounded-lg bg-secondary-200 p-1 dark:bg-secondary-700"
	bind:open
>
	<HideToDosButton bind:hidden bind:open />
	<DropdownDivider class="bg-secondary-100 dark:bg-secondary-800" />
	<SortToDosButton bind:open />
	<HideCompletedToDosButton bind:completedHidden bind:open />
</Dropdown>
