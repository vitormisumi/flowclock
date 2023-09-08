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

<div class="flex h-screen items-center justify-center bg-primary-900">
	{#if form?.success}
		<Button href="/app/session">Continue to app</Button>
	{:else}
		<Card class="border-none bg-secondary-900">
			<p class="pb-8">In order to regain access to your account, please set a new password.</p>
			<form class="flex flex-col gap-4" method="POST" use:enhance={handleClick}>
				<div>
					<Label for="new_password" class="text-secondary-50">New password</Label>
					<Input
						class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
						type="password"
						name="new_password"
						placeholder="Type your new password"
						required
					/>
				</div>
				<div>
					<Label for="new_password2" class="text-secondary-50">Confirm new password</Label>
					<Input
						class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
						type="password"
						name="new_password2"
						placeholder="Confirm your new password"
						required
					/>
				</div>
				<Button type="submit" disabled={loading}>Confirm</Button>
			</form>
		</Card>
	{/if}
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
