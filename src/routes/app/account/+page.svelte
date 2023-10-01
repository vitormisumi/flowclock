<script lang="ts">
	import { fade } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import Notification from '../../Notification.svelte';
	import UpdateEmail from './UpdateEmail.svelte';
	import ResetPassword from './ResetPassword.svelte';
	import DeleteAccount from './DeleteAccount.svelte';

	export let form;
</script>

<div class="flex justify-center">
	<div
		class="grid w-full max-w-xl gap-4 md:gap-8"
		in:fade={$navigating?.from?.url.pathname === '/app/session'
			? { duration: 500, delay: 500 }
			: { duration: 0 }}
	>
		<h1 class="text-center text-xl font-bold text-primary-600">Account</h1>
		<div class="grid gap-4 md:gap-8">
			<UpdateEmail />
			<ResetPassword />
		</div>
		<!-- <hr class="my-4 border-secondary-800" />
		<DeleteAccount /> -->
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
