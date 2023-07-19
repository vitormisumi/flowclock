<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button } from 'flowbite-svelte';

	export let data;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

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
		<p class="text-secondary-50 text-center">{session.user.email}</p>
		<form class="grid justify-center" method="post" use:enhance={handleSignOut}>
			<Button type="submit" disabled={loading}>Sign Out</Button>
		</form>
	</div>
</div>
