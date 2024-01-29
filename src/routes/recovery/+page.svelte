<script lang="ts">
	import { Label, Input } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import logo from '$lib/assets/logo.png';
	import Button from '$lib/components/Button.svelte';
	import Notification from '../Notification.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let form;

	let loading = false;

	const handleRecovery: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="grid h-screen content-start justify-items-center md:content-center bg-secondary-900">
	<div class="grid w-screen max-w-lg justify-items-center gap-8 p-4">
		<a href="/">
			<img src={logo} alt="FlowClock logo" class="w-32 md:w-40 lg:w-48" />
		</a>
		<h1 class="text-center text-xl font-bold text-secondary-50">Password Recovery</h1>
		<form method="POST" class="grid gap-4" use:enhance={handleRecovery}>
			<p class="text-center text-secondary-300">
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
			<Button buttonStyle="accent" type="submit" disabled={loading}>Recover password</Button>
		</form>
		<p class="justify-self-start text-secondary-50">
			Remembered your password? <a href="/signin" class="text-accent-500">Sign in here</a>.
		</p>
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
