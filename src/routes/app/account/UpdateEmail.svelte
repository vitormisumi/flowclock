<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import type { User } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import Modal from '../../../lib/components/Modal.svelte';

	const user: User = getContext('user');

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
	<i class="fa-solid fa-envelope w-full text-3xl dark:text-secondary-300" />
	<p class="dark:text-secondary-200">
		To change the email registered to your account, fill the fields below. You will receive an email
		on both addresses to confirm the change.
	</p>
	<form
		class="flex flex-col gap-4 text-left"
		method="POST"
		action="?/updateEmail"
		use:enhance={handleClick}
	>
		<Input
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
			name="current_email"
			type="email"
			placeholder="Current email"
			required
		>
			<i class="fa-solid fa-envelope" aria-hidden="true" slot="left" /></Input
		>
		<Input
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
			name="new_email"
			type="email"
			placeholder="New email"
			required
		>
			<i class="fa-solid fa-envelope" aria-hidden="true" slot="left" /></Input
		>
		<Button type="submit" disabled={loading} buttonStyle="accent" class="self-center">
			Confirm change
		</Button>
	</form>
</Modal>
