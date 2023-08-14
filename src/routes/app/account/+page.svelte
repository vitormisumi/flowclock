<script lang="ts">
	import { enhance } from '$app/forms';
	import type { User } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button } from 'flowbite-svelte';
	import { getContext } from 'svelte';

	const user: User = getContext('user')

	let loading = false;

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="grid justify-center bg-secondary-900 h-screen items-center">
	<div class="w-screen max-w-lg p-4 grid gap-8">
		<h1 class="text-center text-xl text-primary-600 font-bold">Account</h1>
		<p class="text-secondary-50 text-center">{user.email}</p>
		<form class="grid justify-center" method="POST" action="/app" use:enhance={handleSignOut}>
			<Button type="submit" disabled={loading} class="bg-accent-700">Sign Out</Button>
		</form>
	</div>
</div>
