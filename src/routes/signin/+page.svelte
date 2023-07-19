<script lang="ts">
	import { Card, Label, Input, Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	export let form;
</script>

<div class="grid justify-center bg-secondary-900 h-screen items-center">
	<Card class="grid justify-center m-4">
		<h1 class="text-center text-xl text-primary-600 font-bold mb-4">Sign In</h1>
		<form method="post" use:enhance>
			<Label for="email" class="block mb-2">Email</Label>
			<Input name="email" type="email" value={form?.email ?? ''} placeholder="Type your email">
				<i class="fa-solid fa-envelope" aria-hidden="true" slot="left" /></Input
			>
			<Label for="password" class="block mt-4 mb-2">Password</Label>
			<Input name="password" type="password" placeholder="Type your password">
				<i class="fa-solid fa-lock" aria-hidden="true" slot="left" /></Input
			>
			<Button class="mt-4" type="submit">Sign In</Button>
		</form>
		<p class="mt-2">
			Don't have an account yet? <span class="text-accent-500"
				><a href="/signup">Sign up here</a></span
			>
		</p>
		{#if form?.message}
			{form.message}
		{/if}
	</Card>
</div>
