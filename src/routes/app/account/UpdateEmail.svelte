<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input } from 'flowbite-svelte';
	import Modal from '../../../lib/components/Modal.svelte';

	export let user: User;

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div>
	<p class="font-medium dark:text-secondary-50">Email</p>
	<div class="grid items-center justify-between gap-2 md:flex">
		<p class="text-sm dark:text-secondary-300">{user.email}</p>
		<Button on:click={() => (open = true)} class="w-40">Update email</Button>
	</div>
</div>
<Modal bind:open outsideclose size="xs">
	<form
		class="grid place-items-center gap-4"
		method="POST"
		action="?/updateEmail"
		use:enhance={handleClick}
	>
		<iconify-icon icon="ion:mail" class="text-3xl dark:text-secondary-300" />
		<p class="dark:text-secondary-200">
			To change the email registered to your account, fill the fields below. You will receive an
			email on both addresses to confirm the change.
		</p>
		<Input
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
			name="current_email"
			type="email"
			placeholder="Current email"
			required
		>
			<iconify-icon icon="ion:mail" aria-hidden="true" slot="left" />
		</Input>
		<Input
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
			name="new_email"
			type="email"
			placeholder="New email"
			required
		>
			<iconify-icon icon="ion:mail" aria-hidden="true" slot="left" />
		</Input>
		<Button type="submit" disabled={loading} buttonStyle="accent" class="self-center">
			Confirm change
		</Button>
	</form>
</Modal>
