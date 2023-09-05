<script lang="ts">
	import { enhance } from '$app/forms';
	import type { User } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button, Input, Label, Modal, Toggle } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { session } from '../session/stores';
	import { navigating } from '$app/stores';
	import Notification from '../Notification.svelte';

	export let form;

	const user: User = getContext('user');

	let emailModal: boolean = false;
	let passwordModal: boolean = false;
	let deleteModal: boolean = false;
	let deleteAccount: boolean = false;

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
	class="m-4 md:m-8 grid gap-4 md:gap-8"
	in:fade={$session.running && $navigating?.from?.url.pathname === '/app/session'
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<h1 class="text-center text-xl text-primary-600 font-bold">Account</h1>
	<div class="grid gap-4 md:gap-8">
		<div>
			<p class="text-secondary-50 font-medium">Email</p>
			<div class="grid md:flex items-center justify-between gap-2">
				<p class="text-secondary-300 text-center text-sm">{user.email}</p>
				<Button class="w-full md:w-40" on:click={() => (emailModal = true)}>Update email</Button>
				<Modal bind:open={emailModal} outsideclose size="xs" class="bg-secondary-900">
					<form
						class="flex flex-col gap-4"
						method="POST"
						action="?/updateEmail"
						use:enhance={handleClick}
					>
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
						<Button type="submit" disabled={loading} class="w-40 self-center">Confirm change</Button
						>
					</form>
				</Modal>
			</div>
		</div>
		<div>
			<p class="text-secondary-50 font-medium">Password</p>
			<div class="grid md:flex items-center justify-between gap-2">
				<p class="text-secondary-300 md:text-center text-sm">
					Reset the password you use to log in to your account
				</p>
				<Button class="w-40" on:click={() => (passwordModal = true)}>Reset password</Button>
				<Modal bind:open={passwordModal} outsideclose size="xs" class="bg-secondary-900">
					<form
						class="flex flex-col gap-4"
						method="POST"
						action="?/updatePassword"
						use:enhance={handleClick}
					>
						<p class="text-secondary-50">
							By clicking the button below you will receive an email with a link to reset your
							password.
						</p>
						<Button type="submit" disabled={loading} class="w-40 self-center">Reset password</Button
						>
					</form>
				</Modal>
			</div>
		</div>
	</div>
	<hr class="my-4 border-secondary-800" />
	<div>
		<p class="text-red-700 font-medium">Delete account (still not working)</p>
		<div class="grid md:flex items-center justify-between gap-4">
			<p class="text-secondary-300 md:text-center text-sm">
				Permanently delete your account and wipe all your data
			</p>
			<Button
				type="submit"
				disabled={loading}
				class="border-2 border-red-900 bg-transparent text-red-700 w-40 hover:bg-red-950"
				on:click={() => (deleteModal = true)}>Delete account</Button
			>
			<Modal bind:open={deleteModal} outsideclose size="xs" class="bg-secondary-900">
				<form
					class="flex flex-col gap-4"
					method="POST"
					action="?/deleteAccount"
					use:enhance={handleClick}
				>
					<i class="fa-solid fa-triangle-exclamation text-center w-full text-3xl text-red-800" />
					<p class="text-center">
						<span class="font-bold text-red-800">This action cannot be reversed!</span><br /> By deleting
						your account you will permanently lose access to all your account data. Are you sure you
						want to continue?
					</p>
					<Toggle
						size="small"
						color="red"
						class="text-secondary-50"
						on:change={() => (deleteAccount = !deleteAccount)}>Confirm account deletion</Toggle
					>
					<div class="grid gap-2 md:flex md:justify-between">
						<Button class="w-full md:w-40" on:click={() => (deleteModal = false)}>Cancel</Button>
						<Button
							type="submit"
							disabled={!deleteAccount}
							class="w-full md:w-40 border-2 border-red-900 bg-transparent text-red-700 hover:bg-red-950"
							>Delete</Button
						>
					</div>
				</form>
			</Modal>
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
