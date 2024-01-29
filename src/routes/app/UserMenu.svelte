<script lang="ts">
	import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import { session } from './session/stores';
	import { page } from '$app/stores';
	import avatar from '$lib/assets/avatar.png';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { User } from '@supabase/supabase-js';
	import type { Writable } from 'svelte/store';
	import type { SubmitFunction } from '@sveltejs/kit';

	$: activeUrl = $page.url.pathname;

	const user: User = getContext('user');
	const sessions: Writable<UserSession[]> = getContext('sessions');

	let open = false;

	let loading = false;

	const signOut: SubmitFunction = ({ cancel }) => {
		if ($session.running) {
			cancel();
			open = true;
		}
		return async ({ update }) => {
			await update();
		};
	};

	const saveAndSignOut: SubmitFunction = ({ formData }) => {
		loading = true;
		session.end();
		formData.append('id', String($sessions[0].id));
		formData.append('session_end', new Date().toISOString());
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<Avatar
	border
	id="user-drop"
	src={avatar}
	class="fixed left-3 top-3 cursor-pointer self-center md:left-5 md:top-5 landscape:static"
/>
<Dropdown
	triggeredBy="#user-drop"
	class="w-fit rounded-lg bg-secondary-100 dark:bg-secondary-800"
	placement="right-start"
	{activeUrl}
>
	<DropdownHeader>
		<span class="block truncate text-sm font-medium text-primary-900 dark:text-primary-50"
			>{user.email}</span
		>
	</DropdownHeader>
	<DropdownItem href="/app/account"><i class="fa-solid fa-user pr-2" />Account</DropdownItem>
	<DropdownItem href="/app/settings"><i class="fa-solid fa-gear pr-2" />Settings</DropdownItem>
	<DropdownItem href="/app/contact"><i class="fa-solid fa-envelope pr-2" />Contact</DropdownItem>
	<DropdownDivider />
	<form method="POST" action="/app?/signOut" use:enhance={signOut}>
		<DropdownItem type="submit" class="rounded-b-lg text-red-600">
			<i class="fa-solid fa-right-from-bracket pr-2" />Sign Out
		</DropdownItem>
	</form>
</Dropdown>
<Modal bind:open size="sm">
	<i class="fa-solid fa-warning text-center text-3xl dark:text-secondary-300" />
	<p class="dark:text-secondary-200">
		You currently have a session running.<br />Would you like to save your current session before
		signing out?
	</p>
	<div class="flex justify-between">
		<form method="POST" action="/app?/signOut" use:enhance>
			<Button size="sm" type="submit" buttonStyle="red">Don't Save</Button>
		</form>
		<div class="flex gap-2">
			<form method="POST" action="/app?/saveAndSignOut" use:enhance={saveAndSignOut}>
				<Button size="sm" type="submit" buttonStyle="accent" disabled={loading}>Save</Button>
			</form>
			<Button size="sm" on:click={() => (open = false)}>Cancel</Button>
		</div>
	</div>
</Modal>
