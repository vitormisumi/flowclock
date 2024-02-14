<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Dropdown, DropdownDivider } from 'flowbite-svelte';
	import HideCompletedToDosButton from './HideCompletedToDosButton.svelte';
	import SortToDosButton from './SortToDosButton.svelte';

	export let open: boolean;
	export let completedHidden: boolean;
</script>

<Button size="xs" buttonStyle="menu"><i class="fa-solid fa-ellipsis-vertical" /></Button>
<Dropdown
	placement="bottom"
	class="flex flex-col justify-items-center rounded-lg bg-secondary-200 p-1 dark:bg-secondary-700"
	bind:open
>
	<SortToDosButton bind:open />
	<HideCompletedToDosButton bind:completedHidden bind:open />
</Dropdown>
