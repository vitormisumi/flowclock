<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Dropdown, DropdownDivider } from 'flowbite-svelte';
	import DeleteProjectButton from './DeleteProjectButton.svelte';
	import EditProjectButton from './EditProjectButton.svelte';
	import HideProjectButton from './HideProjectButton.svelte';

	export let hidden: boolean;

	export let open: boolean;
</script>

<Button size="xs" buttonStyle="menu">
	<iconify-icon icon="ion:ellipsis-vertical" />
</Button>
<Dropdown
	placement="bottom"
	class="flex flex-col justify-items-center rounded-lg bg-secondary-200 p-1 dark:bg-secondary-700"
	bind:open
>
	<HideProjectButton bind:hidden bind:open />
	<DropdownDivider class="bg-secondary-100 dark:bg-secondary-800" />
	<EditProjectButton />
	<DeleteProjectButton />
</Dropdown>
