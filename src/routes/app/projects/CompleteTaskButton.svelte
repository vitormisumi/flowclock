<script lang="ts">
	import { Button } from 'flowbite-svelte';

	export let id: number;
</script>

<form method="POST" action="?/completeTask">
	<input type="number" name="id" value={id} hidden />
	<Button
		type="submit"
		class="h-5 w-5 rounded-full border bg-transparent p-0 text-transparent transition-all duration-500 hover:text-primary-50 focus:bg-primary-50 focus:font-bold focus:text-primary-900 focus:ring-2 focus:ring-primary-50"
	>
		<i class="fa-solid fa-check" />
	</Button>
</form>
