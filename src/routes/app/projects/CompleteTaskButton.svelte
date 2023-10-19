<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from 'flowbite-svelte';

	export let id: number;
	export let status: number;
</script>

<form
	method="POST"
	action="?/completeTask"
	use:enhance={({ formData }) => {
		formData.append('id', String(id));
		formData.append('status_id', String(status));
	}}
>
	<Button
		type="submit"
		class="h-5 w-5 rounded-full border bg-transparent p-0 text-transparent transition-all duration-300 hover:text-primary-50 focus:bg-primary-50 focus:font-bold focus:text-primary-900 focus:ring-2 focus:ring-primary-50"
	>
		<i class="fa-solid fa-check" />
	</Button>
</form>
