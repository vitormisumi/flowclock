<script lang="ts">
	import { Button, Tooltip, Modal } from 'flowbite-svelte';
	import { selectedProject, selectedProjectId } from './stores';
	import { enhance } from '$app/forms';

	let open = false;
</script>

<Button
	size="xs"
	class="bg-transparent text-red-700 hover:bg-primary-700"
	on:click={() => (open = true)}><i class="fa-solid fa-trash" /></Button
>
<Tooltip>Delete project</Tooltip>
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
		use:enhance={({ formData }) => {
			formData.append('id', String($selectedProject.id));
			return async ({ update }) => {
				$selectedProjectId = 0;
				update();
			};
		}}
	>
		<Button
			class="border-2 border-red-900 bg-transparent text-red-700 hover:bg-red-950"
			type="submit"
			on:click={() => (open = false)}>Delete</Button
		>
		<Button on:click={() => (open = false)}>Cancel</Button>
	</form>
</Modal>
