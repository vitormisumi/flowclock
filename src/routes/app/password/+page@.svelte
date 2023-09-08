<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button, Card, Input, Label } from 'flowbite-svelte';
	import Notification from '../../Notification.svelte';

	export let form;

	let loading: boolean = false;

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="grid h-screen items-center justify-center bg-secondary-900">
	{#if form?.success}
		<Button href="/app/session" size="xl">Continue to app</Button>
	{:else}
		<div class="grid w-screen max-w-lg gap-8 p-4">
			<h1 class="text-center text-xl font-bold text-primary-600">Password reset</h1>
			<p class="text-center text-secondary-300">
				To regain access to your account, please set a new password.
			</p>
			<form class="grid gap-4" method="POST" use:enhance={handleClick}>
				<div>
					<Label for="new_password" class="mb-2 text-primary-50">New password</Label>
					<Input
						class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
						type="password"
						name="new_password"
						placeholder="Type your new password"
						required><i class="fa-solid fa-lock" aria-hidden="true" slot="left" /></Input
					>
				</div>
				<div>
					<Label for="new_password2" class="mb-2 text-primary-50">Confirm new password</Label>
					<Input
						class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
						type="password"
						name="new_password2"
						placeholder="Confirm your new password"
						required><i class="fa-solid fa-lock" aria-hidden="true" slot="left" /></Input
					>
				</div>
				<Button type="submit" disabled={loading}>Reset password</Button>
			</form>
			<p class="text-secondary-50">
				Remembered your password? <a href="/signin" class="text-accent-500">Sign in here</a>.
			</p>
		</div>
	{/if}
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
