<script lang="ts">
	import { enhance } from '$app/forms';
	import logo from '$lib/assets/logo.png';
	import Button from '$lib/components/Button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input, Label } from 'flowbite-svelte';
	import Notification from '../Notification.svelte';
	import Providers from '../oauth/Providers.svelte';

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

<div class="grid h-screen content-start justify-items-center bg-secondary-900 md:content-center">
	<div class="grid w-screen max-w-lg justify-items-center gap-8 p-4">
		<a href="/">
			<img src={logo} alt="FlowClock logo" class="w-32 md:w-40 lg:w-48" />
		</a>
		<h1 class="text-center text-xl font-bold text-secondary-50">Sign In</h1>
		<form method="POST" class="grid w-full gap-4" use:enhance={handleSignIn}>
			<div>
				<Label for="email" class="mb-2 text-primary-50">Email</Label>
				<Input
					class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
					name="email"
					type="email"
					value={form?.email ?? ''}
					placeholder="Type your email"
				>
					<iconify-icon icon="ion:mail" aria-hidden="true" slot="left" />
				</Input>
			</div>
			<div>
				<Label for="password" class="mb-2 text-primary-50">Password</Label>
				<Input
					class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
					name="password"
					type="password"
					placeholder="Type your password"
				>
					<iconify-icon icon="ion:lock-closed" aria-hidden="true" slot="left" />
				</Input>
			</div>
			<Button type="submit" buttonStyle="accent" disabled={loading}>Sign In</Button>
		</form>
		<a href="/recovery" class="justify-self-start text-accent-500">Lost password?</a>
		<div class="flex w-full items-center justify-center gap-2">
			<hr class="w-full border-secondary-800" />
			<p class="whitespace-nowrap text-sm text-secondary-200">Or with</p>
			<hr class="w-full border-secondary-800" />
		</div>
		<Providers />
		<p class="justify-self-start text-secondary-50">
			New to FlowClock? <a href="/signup" class="text-accent-500">Sign up here</a>.
		</p>
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
