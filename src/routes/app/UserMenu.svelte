<script lang="ts">
	import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import avatar from '$lib/assets/avatar.png';
	import type { User } from '@supabase/supabase-js';

	const user: User = getContext('user');
</script>

<Avatar border id="user-drop" src={avatar} class="cursor-pointer self-center fixed top-3 left-3 md:top-5 md:left-5 landscape:static" />
<Dropdown triggeredBy="#user-drop" class="w-fit" placement="right-start">
	<DropdownHeader>
		<span class="block truncate text-sm font-medium"> {user.email} </span>
	</DropdownHeader>
	<DropdownItem href="/app/account">Account</DropdownItem>
	<DropdownItem href="/app/settings">Settings</DropdownItem>
	<DropdownDivider />
	<form method="POST" action="/app" use:enhance>
		<DropdownItem type="submit" class="rounded-b-lg text-accent-700">Sign Out</DropdownItem>
	</form>
</Dropdown>
