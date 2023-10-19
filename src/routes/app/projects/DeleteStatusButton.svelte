<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let id: number;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('id', String(id));
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<form action="?/deleteStatus" method="POST" use:enhance={handleClick}>
	<Button size="xs" class="bg-transparent" type="submit" disabled={loading}>
		<i class="fa-solid fa-trash" />
	</Button>
</form>
