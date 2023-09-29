<script lang="ts">
	import { Label, Input, Button } from 'flowbite-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import Providers from '../oauth/Providers.svelte';
	import Notification from '../Notification.svelte';
	import logo from '$lib/assets/logo.png';

	export let form;

	let loading = false;

	const handleSignIn: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<a href="/">
	<img
		src={logo}
		alt="FlowClock logo"
		class="absolute left-4 top-4 w-32 md:left-8 md:top-8 md:w-40 lg:left-12 lg:top-12 lg:w-48"
	/>
</a>
<div class="grid h-screen content-center justify-items-center bg-secondary-900">
	<div class="grid w-screen max-w-lg gap-6 p-4">
		<h1 class="text-center text-xl font-bold text-primary-600">Sign In</h1>
		<form method="POST" class="grid gap-4" use:enhance={handleSignIn}>
			<div>
				<Label for="email" class="mb-2 text-primary-50">Email</Label>
				<Input
					class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
					name="email"
					type="email"
					value={form?.email ?? ''}
					placeholder="Type your email"
				>
					<i class="fa-solid fa-envelope" aria-hidden="true" slot="left" /></Input
				>
			</div>
			<div>
				<Label for="password" class="mb-2 text-primary-50">Password</Label>
				<Input
					class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
					name="password"
					type="password"
					placeholder="Type your password"
				>
					<i class="fa-solid fa-lock" aria-hidden="true" slot="left" /></Input
				>
			</div>
			<Button class="w-full" type="submit" disabled={loading}>Sign In</Button>
		</form>
		<a href="/recovery" class="text-accent-500">Lost password?</a>
		<div class="flex items-center justify-center gap-2">
			<hr class="w-full border-secondary-800" />
			<p class="whitespace-nowrap text-sm text-secondary-200">Or with</p>
			<hr class="w-full border-secondary-800" />
		</div>
		<Providers />
		<p class="text-secondary-50">
			New to Flouu? <a href="/signup" class="text-accent-500">Sign up here</a>.
		</p>
	</div>
</div>
{#if form}
	{#if !form?.success}
		<Notification message={form?.message} success={form?.success} />
	{/if}
{/if}
