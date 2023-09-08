<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import { Button, Modal } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { session, sessionBreak } from '../session/stores';
	import { navigating } from '$app/stores';
	import Notification from '../../Notification.svelte';
	import UpdateEmail from './UpdateEmail.svelte';
	import ResetPassword from './ResetPassword.svelte';
	import DeleteAccount from './DeleteAccount.svelte';

	export let form;

	const user: User = getContext('user');

	let emailModal: boolean = false;
	let passwordModal: boolean = false;
	let deleteModal: boolean = false;

	let titles = 'text-secondary-50 font-medium';
	let texts = 'text-secondary-300 text-sm';
</script>

<div
	class="grid gap-4 p-6 md:gap-8 md:p-8 lg:px-40"
	in:fade={$navigating?.from?.url.pathname === '/app/session' &&
	($session.running || ($sessionBreak.running && !$sessionBreak.alarmPlayed))
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<h1 class="text-center text-xl font-bold text-primary-600">Account</h1>
	<div class="grid gap-4 md:gap-8">
		<div>
			<p class={titles}>Email</p>
			<div class="grid items-center justify-between gap-2 md:flex">
				<p class={texts}>{user.email}</p>
				<Button class="w-40" on:click={() => (emailModal = true)}>Update email</Button>
				<Modal bind:open={emailModal} outsideclose size="xs" class="bg-secondary-900">
					<UpdateEmail />
				</Modal>
			</div>
		</div>
		<div>
			<p class={titles}>Password</p>
			<div class="grid items-center justify-between gap-2 md:flex">
				<p class={texts}>Reset the password you use to log in to your account</p>
				<Button class="w-40" on:click={() => (passwordModal = true)}>Reset password</Button>
				<Modal bind:open={passwordModal} outsideclose size="xs" class="bg-secondary-900">
					<ResetPassword />
				</Modal>
			</div>
		</div>
	</div>
	<hr class="my-4 border-secondary-800" />
	<div>
		<p class="font-medium text-red-700">Delete account (still not working)</p>
		<div class="grid items-center justify-between gap-4 md:flex">
			<p class={texts}>Permanently delete your account and wipe all your data</p>
			<Button
				type="submit"
				class="w-40 border-2 border-red-900 bg-transparent text-red-700 hover:bg-red-950"
				on:click={() => (deleteModal = true)}>Delete account</Button
			>
			<Modal bind:open={deleteModal} outsideclose size="xs" class="bg-secondary-900">
				<DeleteAccount />
			</Modal>
		</div>
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
