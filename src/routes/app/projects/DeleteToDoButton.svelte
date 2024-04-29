<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { canHover } from '../stores';

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
	<iconify-icon icon="ion:trash" class="text-red-700 dark:text-red-700" />
</Button>
{#if $canHover}
	<Tooltip placement="left">Delete to-do</Tooltip>
{/if}
<Modal bind:open outsideclose size="xs">
	<iconify-icon icon="ion:warning" class="text-3xl text-red-700 dark:text-red-700" />
	<p class="whitespace-normal dark:text-secondary-200">Delete to-do {toDo.name}?</p>
	<form
		class="flex w-full justify-center gap-4"
		method="POST"
		action="?/deleteToDo"
		use:enhance={handleClick}
	>
		<Button
			buttonStyle="cancel"
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
