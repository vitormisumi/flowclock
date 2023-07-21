<script lang="ts">
	import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import avatar from '$lib/assets/avatar.png'

	const user: { email: string } = getContext('user');

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
	<DropdownItem><a href="/app/account">Account</a></DropdownItem>
	<DropdownItem><a href="/app/settings">Settings</a></DropdownItem>
	<DropdownDivider />
	<DropdownItem>
		<form method="POST" action="/app" use:enhance={handleSignOut}>
			<button>Sign Out</button>
		</form>
	</DropdownItem>
</Dropdown>
