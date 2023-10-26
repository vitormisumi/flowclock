<script lang="ts">
	import {
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		DropdownDivider,
		Modal,
		Button
	} from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import { session } from './session/stores';
	import { page } from '$app/stores';
	import avatar from '$lib/assets/avatar.png';
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
<Dropdown triggeredBy="#user-drop" class="w-fit" placement="right-start" {activeUrl}>
	<DropdownHeader>
		<span class="block truncate text-sm font-medium text-primary-900">{user.email}</span>
	</DropdownHeader>
	<DropdownItem href="/app/account"><i class="fa-solid fa-user pr-2" />Account</DropdownItem>
	<DropdownItem href="/app/settings"><i class="fa-solid fa-gear pr-2" />Settings</DropdownItem>
	<DropdownItem href="/app/contact"><i class="fa-solid fa-envelope pr-2" />Contact</DropdownItem>
	<DropdownDivider />
	<form method="POST" action="/app?/signOut" use:enhance={signOut}>
		<DropdownItem type="submit" class="rounded-b-lg text-accent-700">
			<i class="fa-solid fa-right-from-bracket pr-2" />Sign Out
		</DropdownItem>
	</form>
</Dropdown>
<Modal
	bind:open
	size="sm"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<i class="fa-solid fa-warning text-center text-3xl text-secondary-300" />
	<p class="text-secondary-200">
		You currently have a session running.<br />Would you like to save your current session before
		signing out?
	</p>
	<div class="flex justify-between">
		<form method="POST" action="/app?/signOut" use:enhance>
			<Button
				size="sm"
				type="submit"
				class="border-2 border-red-900 bg-transparent text-red-700 hover:bg-red-950"
				>Don't Save</Button
			>
		</form>
		<div class="flex gap-2">
			<form method="POST" action="/app?/saveAndSignOut" use:enhance={saveAndSignOut}>
				<Button
					size="sm"
					class="w-20 border-2 border-primary-700 hover:border-primary-800"
					type="submit"
					disabled={loading}>Save</Button
				>
			</form>
			<Button size="sm" on:click={() => (open = false)}>Cancel</Button>
		</div>
	</div>
</Modal>
