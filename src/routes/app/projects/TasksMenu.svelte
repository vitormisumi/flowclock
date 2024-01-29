<script lang="ts">
	import { Dropdown, DropdownDivider } from 'flowbite-svelte';
	import Button from '$lib/components/Button.svelte';
	import HideTasksButton from './HideTasksButton.svelte';
	import SortTasksButton from './SortTasksButton.svelte';
	import Notification from '../../Notification.svelte';

	export let open: boolean;
	export let hidden: boolean;

	let success: boolean;
	let message: string;
</script>

<Button size="xs" buttonStyle="menu"><i class="fa-solid fa-ellipsis-vertical" /></Button>
<Dropdown
	placement="bottom"
	class="flex flex-col justify-items-center rounded-lg bg-secondary-200 p-1 dark:bg-secondary-700"
	bind:open
>
	<HideTasksButton bind:hidden bind:open />
	<DropdownDivider class="bg-secondary-100 dark:bg-secondary-800" />
	<SortTasksButton bind:open bind:success bind:message/>
</Dropdown>
{#if success}
	<Notification {success} {message}/>
{/if}
