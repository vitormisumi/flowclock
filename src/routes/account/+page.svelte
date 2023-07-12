<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input, Label, Button } from 'flowbite-svelte';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let avatarUrl: string = profile?.avatar_url ?? '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="form-widget">
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<Label for="email">Email</Label>
		<Input id="email" type="text" value={session.user.email} disabled />
		<Label for="fullName">Full Name</Label>
		<Input id="fullName" type="text" value={form?.fullName ?? fullName} />
		<Label for="username">Username</Label>
		<Input id="username" type="text" value={form?.username ?? username} />

		<div>
			<input type="submit" value={loading ? 'Loading...' : 'Update'} disabled={loading} />
		</div>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<Button type="submit" disabled={loading}>Sign Out</Button>
	</form>
</div>
