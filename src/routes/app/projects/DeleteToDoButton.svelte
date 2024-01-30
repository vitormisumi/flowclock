<script lang="ts">
	import { Tooltip } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { windowWidth } from '../stores';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let toDo: ToDo;
	export let showMenu: number | null;

	let open = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		showMenu = null;
		formData.append('id', String(toDo.id));
		return async ({ update }) => {
			open = false;
			update();
		};
	};
</script>

<Button size="xs" buttonStyle="menu" on:click={() => (open = true)}>
	<i class="fa-solid fa-trash text-red-700 dark:text-red-700" />
</Button>
{#if $windowWidth >= 768}
	<Tooltip placement="left" class="bg-secondary-400 dark:bg-secondary-800">Delete to-do</Tooltip>
{/if}
<Modal bind:open outsideclose size="xs">
	<i class="fa-solid fa-warning text-xl dark:text-red-700" />
	<p class="whitespace-normal dark:text-secondary-200">Delete to-do {toDo.name}?</p>
	<form
		class="flex w-full justify-center gap-4"
		method="POST"
		action="?/deleteToDo"
		use:enhance={handleClick}
	>
		<Button
			on:click={() => {
				open = false;
				showMenu = null;
			}}
		>
			Cancel
		</Button>
		<Button buttonStyle="red" type="submit">Delete</Button>
	</form>
</Modal>
