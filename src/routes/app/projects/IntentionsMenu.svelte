<script lang="ts">
	import { Dropdown } from 'flowbite-svelte';
	import Button from '$lib/components/Button.svelte';
	import HideIntentionsButton from './HideIntentionsButton.svelte';

	export let open: boolean;
	export let hidden: boolean;
</script>

<Button size="xs" buttonStyle="menu"><i class="fa-solid fa-ellipsis-vertical" /></Button>
<Dropdown
	placement="bottom"
	class="flex flex-col justify-items-center rounded-lg bg-secondary-200 p-1 dark:bg-secondary-700"
	bind:open
>
	<HideIntentionsButton bind:hidden bind:open />
</Dropdown>
