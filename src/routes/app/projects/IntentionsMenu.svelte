<script lang="ts">
	import { Button, Dropdown } from 'flowbite-svelte';
    import HideIntentionsButton from './HideIntentionsButton.svelte';

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
	<HideIntentionsButton bind:hidden bind:open />
</Dropdown>
