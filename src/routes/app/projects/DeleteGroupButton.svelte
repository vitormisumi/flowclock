<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Tooltip } from 'flowbite-svelte';
	import { windowWidth } from '../stores';
	import { selectedProjectId } from './stores';

	export let group: ProjectGroup;

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.append('id', String(group.id));
		return async ({ update }) => {
			loading = false;
			open = false;
			$selectedProjectId = 0;
			update();
		};
	};
</script>

<Button size="xs" buttonStyle="menu" on:click={() => (open = true)}>
	<i class="fa-solid fa-trash text-red-700 dark:text-red-700" />
</Button>
{#if $windowWidth >= 768}
	<Tooltip placement="left" class="bg-secondary-400 dark:bg-secondary-800">Delete group</Tooltip>
{/if}
<Modal bind:open outsideclose size="xs">
	<i class="fa-solid fa-warning text-xl dark:text-red-700" />
	<p class="whitespace-normal dark:text-secondary-200">
		Delete group {group.name} and ALL of its projects?
	</p>
	<form
		class="flex w-full justify-center gap-4"
		method="POST"
		action="?/deleteGroup"
		use:enhance={handleClick}
	>
		<Button buttonStyle="cancel" disabled={loading} on:click={() => (open = false)}>Cancel</Button>
		<Button type="submit" buttonStyle="red" disabled={loading}>Delete</Button>
	</form>
</Modal>
