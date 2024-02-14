<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	let open = false;

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
	<p class="font-medium dark:text-secondary-50">Password</p>
	<div class="grid items-center justify-between gap-2 md:flex">
		<p class="text-sm dark:text-secondary-300">
			Reset the password you use to log in to your account
		</p>
		<Button on:click={() => (open = true)} class="w-40">Reset password</Button>
	</div>
</div>
<Modal bind:open outsideclose size="xs">
	<i class="fa-solid fa-lock w-full text-3xl dark:text-secondary-300" />
	<p class="dark:text-secondary-200">
		By clicking the button below you will receive an email with a link to reset your password.
	</p>
	<form
		class="flex flex-col gap-4"
		method="POST"
		action="?/updatePassword"
		use:enhance={handleClick}
	>
		<Button type="submit" disabled={loading} buttonStyle="accent" class="self-center">
			Reset password
		</Button>
	</form>
</Modal>
