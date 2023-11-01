<script lang="ts">
	import { Button, Tooltip, Modal } from 'flowbite-svelte';
	import { selectedProject, selectedProjectId } from './stores';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.append('id', String($selectedProject.id));
		return async ({ update }) => {
			loading = false;
			open = false;
			$selectedProjectId = 0;
			update();
		};
	};
</script>

<Button
	size="xs"
	class="bg-transparent text-red-700 transition-colors hover:bg-primary-700"
	on:click={() => (open = true)}><i class="fa-solid fa-trash" /></Button
>
<Tooltip placement="left">Delete project</Tooltip>
<Modal
	bind:open
	outsideclose
	size="xs"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<i class="fa-solid fa-warning text-xl text-red-700" />
	<p class="whitespace-normal text-secondary-200">
		Delete project {$selectedProject.name}?
	</p>
	<form
		class="flex w-full justify-center gap-4"
		method="POST"
		action="?/delete"
		use:enhance={handleClick}
	>
		<Button
			class="border-2 border-red-900 bg-transparent text-red-700 transition-colors hover:bg-red-950"
			type="submit"
			disabled={loading}>Delete</Button
		>
		<Button disabled={loading} on:click={() => (open = false)}>Cancel</Button>
	</form>
</Modal>
