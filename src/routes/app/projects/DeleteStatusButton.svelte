<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Tooltip } from 'flowbite-svelte';
	import { windowWidth } from '../stores';

	export let s: TaskStatuses;

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('id', String(s.id));
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<Button size="xs" buttonStyle="menu" class="z-10" disabled={loading} on:click={() => (open = true)}>
	<i class="fa-solid fa-trash text-red-700 dark:text-red-700" />
</Button>
{#if $windowWidth >= 768}
	<Tooltip placement="left" class="bg-secondary-400 dark:bg-secondary-800">Delete status</Tooltip>
{/if}
<Modal bind:open outsideclose size="xs">
	<i class="fa-solid fa-warning text-xl dark:text-red-700" />
	<p class="whitespace-normal dark:text-secondary-200">
		Delete status {s.status}? <br /><span class="font-bold"
			>This will delete all tasks inside this status!</span
		>
	</p>
	<form
		class="flex w-full justify-center gap-4"
		method="POST"
		action="?/deleteStatus"
		use:enhance={handleClick}
	>
		<Button buttonStyle="cancel" disabled={loading} on:click={() => (open = false)}>Cancel</Button>
		<Button
			class="border-2 border-red-900 bg-transparent transition-colors hover:bg-red-950 dark:bg-transparent dark:text-red-700"
			type="submit"
			disabled={loading}
		>
			Delete
		</Button>
	</form>
</Modal>
