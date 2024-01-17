<script lang="ts">
	import { Button, Dropdown, DropdownDivider } from 'flowbite-svelte';
	import HideProjectButton from './HideProjectButton.svelte';
	import EditProjectButton from './EditProjectButton.svelte';
	import DeleteProjectButton from './DeleteProjectButton.svelte';

	export let hidden: boolean;

	export let open: boolean;
</script>

<Button size="xs" class="bg-transparent transition-colors">
	<i class="fa-solid fa-ellipsis-vertical"></i>
</Button>
<Dropdown
	placement="bottom"
	class="flex flex-col justify-items-center rounded-lg bg-primary-900 p-1"
	bind:open
>
	<HideProjectButton bind:hidden bind:open />
	<DropdownDivider class="bg-primary-800"/>
	<EditProjectButton />
	<DeleteProjectButton />
</Dropdown>
