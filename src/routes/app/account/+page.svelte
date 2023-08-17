<script lang="ts">
	import { enhance } from '$app/forms';
	import type { User } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { session } from '../session/stores';
	import { navigating } from '$app/stores';

	const user: User = getContext('user');

	let loading = false;

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div
	class="grid justify-center bg-secondary-900 h-screen items-center"
	in:fade={$session.running && $navigating?.from?.url.pathname === '/app/session' ? { duration: 500, delay: 500 } : { duration: 0 }}
>
	<div class="w-screen max-w-lg p-4 grid gap-8">
		<h1 class="text-center text-xl text-primary-600 font-bold">Account</h1>
		<p class="text-secondary-50 text-center">{user.email}</p>
		<form class="grid justify-center" method="POST" action="/app" use:enhance={handleSignOut}>
			<Button type="submit" disabled={loading} class="bg-accent-700">Sign Out</Button>
		</form>
	</div>
</div>
