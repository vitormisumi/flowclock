<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Toggle } from 'flowbite-svelte';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { enhance } from '$app/forms';

	let open: boolean;

	let confirmDelete = false;

	let loading = false;

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			open = false;
			update();
		};
	};
</script>

<div>
	<p class="font-medium dark:text-red-700">Delete account (still not working)</p>
	<div class="grid items-center justify-between gap-4 md:flex">
		<p class="text-sm dark:text-secondary-300">
			Permanently delete your account and wipe all your data
		</p>
		<Button type="submit" buttonStyle="red" on:click={() => (open = true)}>Delete account</Button>
		<Modal bind:open outsideclose size="xs">
			<form
				class="flex flex-col gap-4"
				method="POST"
				action="?/deleteAccount"
				use:enhance={handleClick}
			>
				<i class="fa-solid fa-triangle-exclamation w-full text-center text-3xl dark:text-red-800" />
				<p class="text-center dark:text-secondary-200">
					<span class="font-bold dark:text-red-800">This action cannot be reversed!</span><br /> By deleting
					your account you will permanently lose access to all your account data. Are you sure you want
					to continue?
				</p>
				<Toggle
					size="small"
					color="red"
					class="text-primary-900 dark:text-primary-50"
					on:change={() => (confirmDelete = !confirmDelete)}>Confirm account deletion</Toggle
				>
				<div class="flex justify-center gap-4">
					<Button type="submit" buttonStyle="red" disabled={!confirmDelete}>Delete</Button>
					<Button disabled={loading}>Cancel</Button>
				</div>
			</form>
		</Modal>
	</div>
</div>
