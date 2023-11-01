<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from 'flowbite-svelte';

	export let toDo: ToDo;

	const priorityColors: { [key: number]: string } = {
		0: 'white',
		1: 'green',
		2: 'yellow',
		3: 'red'
	};

	let border: string;
	if (toDo.priority) {
		border = priorityColors[toDo.priority];
	}
</script>

<form
	method="POST"
	action="?/completeToDo"
	class="flex items-center"
	use:enhance={({ formData }) => {
		formData.append('id', String(toDo.id));
		formData.append('done', String(toDo.done));
	}}
>
	<button
		type="submit"
		class="h-5 w-5 flex items-center justify-center rounded-full border border-[{border}] bg-transparent p-0 {toDo.done
			? 'bg-primary-50 text-secondary-600 hover:bg-transparent hover:text-transparent focus:bg-transparent focus:text-transparent focus:ring-2 focus:ring-primary-700'
			: 'text-transparent hover:bg-primary-700 hover:text-primary-50 focus:bg-primary-50 focus:text-primary-900 focus:ring-2 focus:ring-primary-50'} transition-all duration-300"
		on:click|stopPropagation
	>
		<i class="fa-solid fa-check" />
	</button>
</form>
