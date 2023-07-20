<script lang="ts">
	import { Label, Input, Button } from 'flowbite-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import type { Provider } from '@supabase/supabase-js';

	export let form;

	let loading = false;

	const handleSignIn: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};

	const providers = [
		{
			name: 'facebook',
			icon: 'fa-facebook'
		},
		{
			name: 'github',
			icon: 'fa-github'
		},
		{
			name: 'google',
			icon: 'fa-google'
		}
	];
</script>

<div class="grid justify-center bg-secondary-900 h-screen items-center">
	<div class="w-screen max-w-lg p-4 grid gap-8">
		<h1 class="text-center text-xl text-primary-600 font-bold">Sign In</h1>
		<p class="text-secondary-50">
			New to Flouu? <a href="/signup" class="text-accent-500">Sign up here</a>.
		</p>
		<form method="POST" action="?/email" class="grid gap-4" use:enhance={handleSignIn}>
			<div>
				<Label for="email" class="text-primary-50 mb-2">Email</Label>
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
		<div class="flex justify-center items-center gap-2">
			<hr class="border-secondary-800 w-full" />
			<p class="text-secondary-200 whitespace-nowrap text-sm">Or with</p>
			<hr class="border-secondary-800 w-full" />
		</div>
		<div class="grid gap-4">
			{#each providers as provider}
				<form action="?/oauth" method="POST" use:enhance={handleSignIn}>
					<input type="hidden" name="provider" value={provider.name} />
					<Button outline class="bg-secondary-50 w-full capitalize" type="submit"
						><i class="fa-brands {provider.icon} pr-2" />{provider.name}</Button
					>
				</form>
			{/each}
			{#if form?.message}
				{form.message}
			{/if}
		</div>
	</div>
</div>
