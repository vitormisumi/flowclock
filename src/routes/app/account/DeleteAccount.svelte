<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button, Modal, Toggle } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	let open: boolean;

	let confirmDelete: boolean = false;

	let loading: boolean = false;

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div>
	<p class="font-medium text-red-700">Delete account (still not working)</p>
	<div class="grid items-center justify-between gap-4 md:flex">
		<p class="text-sm text-secondary-300">Permanently delete your account and wipe all your data</p>
		<Button
			type="submit"
			class="w-40 border-2 border-red-900 bg-transparent text-red-700 hover:bg-red-950"
			on:click={() => (open = true)}>Delete account</Button
		>
		<Modal bind:open outsideclose size="xs" class="bg-secondary-900">
			<form
				class="flex flex-col gap-4"
				method="POST"
				action="?/deleteAccount"
				use:enhance={handleClick}
			>
				<i class="fa-solid fa-triangle-exclamation w-full text-center text-3xl text-red-800" />
				<p class="text-center text-secondary-200">
					<span class="font-bold text-red-800">This action cannot be reversed!</span><br /> By deleting
					your account you will permanently lose access to all your account data. Are you sure you want
					to continue?
				</p>
				<Toggle
					size="small"
					color="red"
					class="text-primary-50"
					on:change={() => (confirmDelete = !confirmDelete)}>Confirm account deletion</Toggle
				>
				<div class="flex justify-center gap-4">
					<Button
						type="submit"
						disabled={!confirmDelete}
						class="border-2 border-red-900 bg-transparent text-red-700 hover:bg-red-950"
						>Delete</Button
					>
					<Button on:click={() => (open = false)}>Cancel</Button>
				</div>
			</form>
		</Modal>
	</div>
</div>
