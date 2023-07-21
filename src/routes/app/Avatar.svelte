<script lang="ts">
	import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';

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

<Avatar id="user-drop" src="/images/profile-picture-3.webp" class="cursor-pointer" />
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
