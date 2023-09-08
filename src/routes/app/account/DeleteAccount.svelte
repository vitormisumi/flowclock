<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button, Toggle } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	let deleteAccount: boolean = false;

	let loading: boolean = false;

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<form class="flex flex-col gap-4" method="POST" action="?/deleteAccount" use:enhance={handleClick}>
	<i class="fa-solid fa-triangle-exclamation w-full text-center text-3xl text-red-800" />
	<p class="text-center">
		<span class="font-bold text-red-800">This action cannot be reversed!</span><br /> By deleting your
		account you will permanently lose access to all your account data. Are you sure you want to continue?
	</p>
	<Toggle
		size="small"
		color="red"
		class="text-secondary-50"
		on:change={() => (deleteAccount = !deleteAccount)}>Confirm account deletion</Toggle
	>
	<div class="grid gap-2 md:flex md:justify-between">
		<Button
			type="submit"
			disabled={!deleteAccount}
			class="w-full border-2 border-red-900 bg-transparent text-red-700 hover:bg-red-950 md:w-40"
			>Delete</Button
		>
	</div>
</form>
