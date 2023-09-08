<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Label, Input, Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	let loading: boolean = false;

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<form class="flex flex-col gap-4" method="POST" action="?/updateEmail" use:enhance={handleClick}>
	<i class="fa-solid fa-envelope w-full text-center text-3xl text-secondary-300" />
	<p class="text-center text-secondary-300">
		To change the email registered to your account, fill the fields below. You will receive an email
		on both addresses to confirm the change.
	</p>
	<div>
		<Label for="current_email" class="mb-2 text-primary-50">Current Email</Label>
		<Input
			class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
			name="email"
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
			name="email"
			type="email"
			placeholder="Type your new email"
			required
		>
			<i class="fa-solid fa-envelope" aria-hidden="true" slot="left" /></Input
		>
	</div>
	<Button type="submit" disabled={loading} class="w-40 self-center">Confirm change</Button>
</form>
