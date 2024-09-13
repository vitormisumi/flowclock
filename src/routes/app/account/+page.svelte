<script lang="ts">
	import { navigating } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Notification from '../../Notification.svelte';
	import ResetPassword from './ResetPassword.svelte';
	import UpdateEmail from './UpdateEmail.svelte';

	export let data;

	export let form;
</script>

<div class="flex justify-center">
	<div
		class="grid w-full max-w-xl gap-4 md:gap-8"
		in:fade={$navigating?.from?.url.pathname === '/app/session'
			? { duration: 500, delay: 500 }
			: { duration: 0 }}
	>
		<h1 class="text-center text-xl font-bold text-secondary-900 dark:text-secondary-50">Account</h1>
		<div class="grid gap-4 md:gap-8">
			{#if data.user}
				<UpdateEmail user={data.user} />
			{/if}
			<ResetPassword />
		</div>
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
