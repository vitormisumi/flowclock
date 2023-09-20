<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { Label, Input, Button } from 'flowbite-svelte';
	import Providers from '../oauth/Providers.svelte';
	import Notification from '../Notification.svelte';
	import logo from '$lib/assets/logo.png'

	export let form;
</script>

<img src={logo} alt="Flouu logo" class="absolute left-4 top-0 h-20" />
<div class="grid h-screen content-center justify-items-center bg-secondary-900">
	<div class="grid w-screen max-w-lg gap-8 p-4">
		<h1 class="text-center text-xl font-bold text-primary-600">Sign Up</h1>
		<form method="post" class="grid gap-4" use:enhance>
			<div>
				<Label for="email" class="mb-2 text-primary-50">Email</Label>
				<Input
					class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
					name="email"
					type="email"
					value={form?.email ?? ''}
					placeholder="Type your email"
				>
					<i
						class="fa-solid fa-envelope text-secondary-500"
						aria-hidden="true"
						slot="left"
					/></Input
				>
			</div>
			<div>
				<Label for="password" class="mb-2 text-primary-50">Password</Label>
				<Input
					class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
					name="password"
					type="password"
					placeholder="Create a password"
				>
					<i class="fa-solid fa-lock text-secondary-500" aria-hidden="true" slot="left" /></Input
				>
			</div>
			<div>
				<Label for="password-confirmation" class="mb-2 text-primary-50">Password confirmation</Label
				>
				<Input
					class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"
					name="password-confirmation"
					type="password"
					placeholder="Retype your password"
				>
					<i class="fa-solid fa-lock text-secondary-500" aria-hidden="true" slot="left" /></Input
				>
			</div>
			<Button class="w-full" type="submit">Sign Up</Button>
		</form>
		<div class="flex items-center justify-center gap-2">
			<hr class="w-full border-secondary-800" />
			<p class="whitespace-nowrap text-sm text-secondary-200">Or with</p>
			<hr class="w-full border-secondary-800" />
		</div>
		<Providers />
		<p class="text-primary-50">
			Already have an account? <a href="/signin" class="text-accent-500">Sign in</a>.
		</p>
	</div>
</div>
{#if form}
	{#if !form?.success}
		<Notification message={form?.message} success={form?.success} />
	{/if}
{/if}
