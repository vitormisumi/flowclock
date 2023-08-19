<script lang="ts">
	import { enhance } from '$app/forms';
	import type { User } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button, Input, Label, Modal } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { session } from '../session/stores';
	import { navigating } from '$app/stores';
	import Notification from '../Notification.svelte';

	export let form;

	const user: User = getContext('user');

	let emailModal: boolean = false;
	let passwordModal: boolean = false;

	let loading: boolean = false;

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div
	class="m-4 md:m-8 lg:m-12 grid gap-4"
	in:fade={$session.running && $navigating?.from?.url.pathname === '/app/session'
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<h1 class="text-center text-xl text-primary-600 font-bold">Account</h1>
	<div>
		<p class="text-secondary-50 font-medium">Email</p>
		<div class="flex items-center justify-between gap-4">
			<p class="text-secondary-300 text-center text-sm">{user.email}</p>
			<Button class="w-40" on:click={() => (emailModal = true)}>Update email</Button>
			<Modal bind:open={emailModal} outsideclose size="xs">
				<form
					class="flex flex-col gap-4"
					method="POST"
					action="?/updateEmail"
					use:enhance={handleClick}
				>
					<Label for="current_email">Current Email</Label>
					<Input
						type="email"
						name="current_email"
						placeholder="Confirm your current email"
						required
					/>
					<Label for="new_email">New Email</Label>
					<Input type="email" name="new_email" placeholder="Type your new email" required />
					<Button type="submit" disabled={loading} class="w-40 self-end">Confirm change</Button>
				</form>
			</Modal>
		</div>
	</div>
	<div>
		<p class="text-secondary-50 font-medium">Password</p>
		<div class="flex items-center justify-between gap-4">
			<p class="text-secondary-300 text-center text-sm">
				Update the password you use to log in to your account
			</p>
			<Button class="w-40" on:click={() => (passwordModal = true)}>Update password</Button>
			<Modal bind:open={passwordModal} outsideclose size="xs">
				<form
					class="flex flex-col gap-4"
					method="POST"
					action="?/updatePassword"
					use:enhance={handleClick}
				>
					<Label for="current_password">Current Password</Label>
					<Input
						type="password"
						name="current_password"
						placeholder="Confirm your current password"
						required
					/>
					<Label for="new_password">New Password</Label>
					<Input type="password" name="new_password" placeholder="Type your new password" required />
					<Label for="new_password">Confirm New Password</Label>
					<Input type="email" name="new_password" placeholder="Type your new password" required />
					<Button type="submit" disabled={loading} class="w-40 self-end">Confirm change</Button>
				</form>
			</Modal>
		</div>
	</div>
	<hr class="my-8 border-secondary-800" />
	<div>
		<p class="text-red-700 font-medium">Delete account</p>
		<div class="flex items-center justify-between gap-4">
			<p class="text-secondary-300 text-center text-sm">
				Permanently delete your account and wipe all your data
			</p>
			<form class="grid justify-center" method="POST" action="/app" use:enhance={handleClick}>
				<Button
					type="submit"
					disabled={loading}
					class="border-2 border-red-900 bg-transparent text-red-700 w-40">Delete account</Button
				>
			</form>
		</div>
	</div>
</div>
{#if form}
	{#if form?.success}
		<Notification message={form?.message} success={form?.success} />
	{:else}
		<Notification message={form?.message} success={form?.success} />
	{/if}
{/if}
