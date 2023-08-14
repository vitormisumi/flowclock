<script lang="ts">
	import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import avatar from '$lib/assets/avatar.png';
	import type { User } from '@supabase/supabase-js';

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

<Avatar border id="user-drop" src={avatar} class="cursor-pointer fixed right-4 top-4" />
<Dropdown triggeredBy="#user-drop" class="w-fit">
	<DropdownHeader>
		<span class="block truncate text-sm font-medium"> {user.email} </span>
	</DropdownHeader>
	<DropdownItem href="/app/account">Account</DropdownItem>
	<DropdownItem href="/app/settings">Settings</DropdownItem>
	<DropdownDivider />
	<form method="POST" action="/app" use:enhance={handleSignOut}>
		<DropdownItem type="submit" class="text-accent-700 rounded-b-lg">Sign Out</DropdownItem>
	</form>
</Dropdown>
