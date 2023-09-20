<script lang="ts">
	import { Label, Input, Button } from 'flowbite-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import Notification from '../Notification.svelte';
	import logo from '$lib/assets/logo.png'

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

<img src={logo} alt="Flouu logo" class="absolute left-4 top-0 h-20" />
<div class="grid h-screen content-center justify-items-center bg-secondary-900">
	<div class="grid w-screen max-w-lg gap-8 p-4">
		<h1 class="text-center text-xl font-bold text-primary-600">Password Recovery</h1>
		<form method="POST" class="grid gap-4" use:enhance={handleSignIn}>
			<p class="text-secondary-300 text-center">
				Type your email below and we will send you a link to reset your password
			</p>
			<div>
				<Label for="email" class="mb-2 text-primary-50">Email</Label>
				<Input
					class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
					name="email"
					type="email"
					placeholder="Type your email"
				>
					<i class="fa-solid fa-envelope" aria-hidden="true" slot="left" /></Input
				>
			</div>
			<Button class="w-full" type="submit" disabled={loading}>Recover password</Button>
		</form>
		<p class="text-secondary-50">
			Remembered your password? <a href="/signin" class="text-accent-500">Sign in here</a>.
		</p>
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
