<script lang="ts">
	import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-svelte';
</script>

<Avatar id="user-drop" src="/images/profile-picture-3.webp" class="cursor-pointer" />
<Dropdown triggeredBy="#user-drop">
	<DropdownHeader>
		<span class="block text-sm"> John Doe </span>
		<span class="block truncate text-sm font-medium"> name@email.com </span>
	</DropdownHeader>
	<DropdownItem><a href="/app/account">Account</DropdownItem>
	<DropdownItem><a href="/app/settings">Settings</a></DropdownItem>
	<DropdownDivider />
	<DropdownItem>Sign out</DropdownItem>
</Dropdown>
