<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Dropdown } from 'flowbite-svelte';

	export let open: boolean;
</script>

<Button size="xs" buttonStyle="menu">
	<iconify-icon icon="ion:ellipsis-vertical" />
</Button>
<Dropdown
	placement="bottom"
	class="flex flex-col justify-items-center rounded-lg bg-secondary-200 p-1 dark:bg-secondary-700"
	bind:open
></Dropdown>
