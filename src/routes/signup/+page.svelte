<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { Label, Input, Button } from 'flowbite-svelte';

	export let form;
</script>

<div class="grid justify-center bg-secondary-900 h-screen items-center">
	<div class="w-screen max-w-lg p-4 grid gap-8">
		<h1 class="text-center text-xl text-primary-600 font-bold">Sign Up</h1>
		<p class="text-primary-50">
			Already have an account? <a href="/signin" class="text-accent-500">Sign in</a>.
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
					<i
						class="fa-solid fa-envelope text-secondary-500"
						aria-hidden="true"
						slot="left"
					/></Input
				>
			</div>
			<div>
				<Label for="password" class="text-primary-50 mb-2">Password</Label>
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
				<Label for="password-confirmation" class="text-primary-50 mb-2">Password confirmation</Label>
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
		<hr class="border-primary-800" />
		<div class="grid gap-4">
			<Button outline class="bg-secondary-50"
				><i class="fa-brands fa-github pr-2" />Sign up with Github</Button
			>
			<Button outline class="bg-secondary-50"
				><i class="fa-brands fa-google pr-2" />Sign up with Google</Button
			>
		</div>
	</div>
</div>
