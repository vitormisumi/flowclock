<script lang="ts">
	import { Button, Dropdown } from 'flowbite-svelte';
    import EditIntentionButton from './EditIntentionButton.svelte';
    import DeleteIntentionButton from './DeleteIntentionButton.svelte';
	import { slide } from 'svelte/transition';
	import StartIntentionButton from './StartIntentionButton.svelte';

	export let intention: Intention;
	export let showMenu: number | null;
</script>

<div transition:slide={{ axis: 'x' }}>
	<Button size="xs" class="bg-transparent transition-colors">
		<i class="fa-solid fa-ellipsis-vertical"></i>
	</Button>
	<Dropdown placement="left" class="flex justify-items-center rounded-lg bg-primary-800 p-1">
		<StartIntentionButton {intention} />
		<EditIntentionButton {intention} bind:showMenu />
		<DeleteIntentionButton {intention} />
	</Dropdown>
</div>