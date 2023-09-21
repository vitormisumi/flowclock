<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button, Modal } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	let open: boolean = false;

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
	<p class="text-secondary-50 font-medium">Password</p>
	<div class="grid items-center justify-between gap-2 md:flex">
		<p class='text-secondary-300 text-sm'>Reset the password you use to log in to your account</p>
		<Button class="w-40" on:click={() => (open = true)}>Reset password</Button>
		<Modal bind:open outsideclose size="xs" class="bg-secondary-900">
			<form
				class="flex flex-col gap-4"
				method="POST"
				action="?/updatePassword"
				use:enhance={handleClick}
			>
				<i class="fa-solid fa-lock w-full text-center text-3xl text-secondary-300" />
				<p class="text-center text-secondary-200">
					By clicking the button below you will receive an email with a link to reset your password.
				</p>
				<Button type="submit" disabled={loading} class="w-40 self-center" on:click={() => open = false}>Reset password</Button>
			</form>
		</Modal>
	</div>
</div>
