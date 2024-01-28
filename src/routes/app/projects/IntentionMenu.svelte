<script lang="ts">
	import { Dropdown } from 'flowbite-svelte';
	import Button from '$lib/components/Button.svelte';
	import EditIntentionButton from './EditIntentionButton.svelte';
	import DeleteIntentionButton from './DeleteIntentionButton.svelte';
	import { slide } from 'svelte/transition';
	import StartIntentionButton from './StartIntentionButton.svelte';

	export let intention: Intention;
	export let showMenu: number | null;
</script>

<div transition:slide={{ axis: 'x' }}>
	<Button size="xs" buttonStyle="menu"><i class="fa-solid fa-ellipsis-vertical" /></Button>
	<Dropdown
		placement="left"
		class="flex justify-items-center rounded-lg bg-secondary-100 p-1 dark:bg-secondary-800"
	>
		<StartIntentionButton {intention} />
		<EditIntentionButton {intention} bind:showMenu />
		<DeleteIntentionButton {intention} />
	</Dropdown>
</div>
