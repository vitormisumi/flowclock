<script lang="ts">
	import { Button, Dropdown, DropdownDivider } from 'flowbite-svelte';
	import HideToDosButton from './HideToDosButton.svelte';
	import SortToDosButton from './SortToDosButton.svelte';
	import HideCompletedToDosButton from './HideCompletedToDosButton.svelte';

	export let open: boolean;
	export let hidden: boolean;
	export let completedHidden: boolean;
</script>

<Button size="xs" class="bg-transparent transition-colors">
	<i class="fa-solid fa-ellipsis-vertical"></i>
</Button>
<Dropdown
	placement="bottom"
	class="flex flex-col justify-items-center rounded-lg bg-primary-900 p-1"
	bind:open
>
	<HideToDosButton bind:hidden bind:open />
	<DropdownDivider class="bg-primary-800"/>
	<SortToDosButton bind:open />
	<HideCompletedToDosButton bind:completedHidden bind:open />
</Dropdown>
