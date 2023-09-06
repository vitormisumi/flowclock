<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	let loading: boolean = false;

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<form class="flex flex-col gap-4" method="POST" action="?/updatePassword" use:enhance={handleClick}>
	<p class="text-secondary-50">
		By clicking the button below you will receive an email with a link to reset your password.
	</p>
	<Button type="submit" disabled={loading} class="w-40 self-center">Reset password</Button>
</form>
