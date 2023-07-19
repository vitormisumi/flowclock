<script lang="ts">
	import { Label, Input, Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	export let form;
</script>

<div class="grid justify-center bg-secondary-900 h-screen items-center">
	<div class="w-screen max-w-lg p-4 grid gap-8">
		<h1 class="text-center text-xl text-primary-600 font-bold">Sign In</h1>
		<p class="text-secondary-50">
			New to Flouu? <a href="/signup" class="text-accent-500">Sign up here</a>.
		</p>
		<form method="post" class="grid gap-4" use:enhance>
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
			<Button class="w-full" type="submit">Sign In</Button>
		</form>
		<hr class="border border-y-1 border-secondary-800" />
		<div class="grid gap-4">
			<Button outline class="bg-secondary-50"
				><i class="fa-brands fa-github pr-2" />Sign in with Github</Button
			>
			<Button outline class="bg-secondary-50"
				><i class="fa-brands fa-google pr-2" />Sign in with Google</Button
			>
		</div>
	</div>
</div>
