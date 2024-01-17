<script lang="ts">
	import { Button, Dropdown, DropdownDivider } from 'flowbite-svelte';
	import HideTasksButton from './HideTasksButton.svelte';
	import SortTasksButton from './SortTasksButton.svelte';

	export let open: boolean;
	export let hidden: boolean;
</script>

<Button size="xs" class="bg-transparent transition-colors">
	<i class="fa-solid fa-ellipsis-vertical"></i>
</Button>
<Dropdown
	placement="bottom"
	class="flex flex-col justify-items-center rounded-lg bg-primary-900 p-1"
	bind:open
>
	<HideTasksButton bind:hidden bind:open />
	<DropdownDivider class="bg-primary-800"/>
	<SortTasksButton bind:open />
</Dropdown>
