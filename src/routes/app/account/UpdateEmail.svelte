<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import { getContext } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Label, Input, Button, Modal } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	const user: User = getContext('user');

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
	<p class="font-medium text-secondary-50">Email</p>
	<div class="grid items-center justify-between gap-2 md:flex">
		<p class="text-sm text-secondary-300">{user.email}</p>
		<Button class="w-40" on:click={() => (open = true)}>Update email</Button>
	</div>
</div>
<Modal
	bind:open
	outsideclose
	size="xs"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<i class="fa-solid fa-envelope w-full text-3xl text-secondary-300" />
	<p class="text-secondary-200">
		To change the email registered to your account, fill the fields below. You will receive an email
		on both addresses to confirm the change.
	</p>
	<form class="flex flex-col gap-4 text-left" method="POST" action="?/updateEmail" use:enhance={handleClick}>
		<div>
			<Label for="current_email" class="mb-2 text-primary-50">Current Email</Label>
			<Input
				class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
				name="current_email"
				type="email"
				placeholder="Confirm your current email"
				required
			>
				<i class="fa-solid fa-envelope" aria-hidden="true" slot="left" /></Input
			>
		</div>
		<div>
			<Label for="new_email" class="mb-2 text-primary-50">New Email</Label>
			<Input
				class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
				name="new_email"
				type="email"
				placeholder="Type your new email"
				required
			>
				<i class="fa-solid fa-envelope" aria-hidden="true" slot="left" /></Input
			>
		</div>
		<Button type="submit" disabled={loading} class="w-40 self-center">Confirm change</Button>
	</form>
</Modal>
