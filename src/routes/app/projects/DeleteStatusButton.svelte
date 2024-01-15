<script lang="ts">
	import { Button, Modal, Tooltip } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

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

<Button
	size="xs"
	class="z-10 bg-transparent text-red-700 transition-colors hover:bg-primary-700"
	disabled={loading}
	on:click={() => (open = true)}
>
	<i class="fa-solid fa-trash" />
</Button>
<Tooltip placement="left">Delete status</Tooltip>
<Modal
	bind:open
	outsideclose
	size="xs"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<i class="fa-solid fa-warning text-xl text-red-700" />
	<p class="whitespace-normal text-secondary-200">Delete status {s.status}? <br /><span class="font-bold">This will delete all tasks inside this status!</span></p>
	<form
		class="flex w-full justify-center gap-4"
		method="POST"
		action="?/deleteStatus"
		use:enhance={handleClick}
	>
		<Button
			class="border-2 border-red-900 bg-transparent text-red-700 transition-colors hover:bg-red-950"
			type="submit"
			disabled={loading}
		>
			Delete
		</Button>
		<Button disabled={loading} on:click={() => (open = false)}>Cancel</Button>
	</form>
</Modal>
