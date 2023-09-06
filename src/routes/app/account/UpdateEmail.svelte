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
	<div>
		<Label for="current_email" class="text-primary-50">Current Email</Label>
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
		<Label for="new_email" class="text-primary-50">New Email</Label>
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
