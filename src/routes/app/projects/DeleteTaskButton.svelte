<script lang="ts">
	import { Tooltip } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { windowWidth } from '../stores';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let task: Task;

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.append('id', String(task.id));
		return async ({ update }) => {
			loading = false;
			open = false;
			update();
		};
	};
</script>

<Button
	size="xs"
	buttonStyle="menu"
	class="text-red-700 dark:text-red-700"
	on:click={() => (open = true)}
>
	<i class="fa-solid fa-trash" />
</Button>
{#if $windowWidth >= 768}
	<Tooltip placement="left" class="bg-secondary-400 dark:bg-secondary-800">Delete task</Tooltip>
{/if}
<Modal bind:open outsideclose size="xs">
	<i class="fa-solid fa-warning text-xl dark:text-red-700" />
	<p class="whitespace-normal dark:text-secondary-200">Delete task {task.name}?</p>
	<form
		class="flex w-full justify-center gap-4"
		method="POST"
		action="?/deleteTask"
		use:enhance={handleClick}
	>
		<Button disabled={loading} on:click={() => (open = false)}>Cancel</Button>
		<Button buttonStyle="red" type="submit" disabled={loading}>Delete</Button>
	</form>
</Modal>
