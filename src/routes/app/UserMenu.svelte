<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import avatar from '$lib/assets/avatar.png';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-svelte';
	import { session } from './session/stores';

	$: activeUrl = $page.url.pathname;

	export let user: User;
	export let sessions: Session[];

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
		formData.append('id', String(sessions[0].id));
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
	<DropdownItem href="/app/account" class="flex items-center gap-2">
		<iconify-icon icon="ion:person" />Account
	</DropdownItem>
	<DropdownItem href="/app/settings" class="flex items-center gap-2">
		<iconify-icon icon="ion:settings" />Settings
	</DropdownItem>
	<DropdownItem href="/app/contact" class="flex items-center gap-2">
		<iconify-icon icon="ion:mail" />Contact
	</DropdownItem>
	<DropdownDivider />
	<form method="POST" action="/app?/signOut" use:enhance={signOut}>
		<DropdownItem type="submit" class="flex items-center gap-2 rounded-b-lg text-red-600">
			<iconify-icon icon="ion:log-out" />Log Out
		</DropdownItem>
	</form>
</Dropdown>
<Modal bind:open size="sm">
	<iconify-icon icon="ion:warning" class="text-center text-3xl dark:text-secondary-300" />
	<p class="dark:text-secondary-200">
		You currently have a session running.<br />Would you like to save your current session before
		signing out?
	</p>
	<div class="flex justify-between">
		<form method="POST" action="/app?/signOut" use:enhance>
			<Button size="sm" type="submit" buttonStyle="red">Don't Save</Button>
		</form>
		<div class="flex gap-2">
			<Button size="sm" buttonStyle="cancel" on:click={() => (open = false)}>Cancel</Button>
			<form method="POST" action="/app?/saveAndSignOut" use:enhance={saveAndSignOut}>
				<Button size="sm" type="submit" buttonStyle="accent" disabled={loading}>Save</Button>
			</form>
		</div>
	</div>
</Modal>
