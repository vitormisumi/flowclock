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
	use:enhance={({ formData }) => {
		formData.append('id', String(toDo.id));
		formData.append('done', String(toDo.done));
	}}
>
	<Button
		type="submit"
		class="h-5 w-5 rounded-full border border-[{border}] bg-transparent p-0 text-transparent transition-all duration-300 hover:text-primary-50 focus:bg-primary-50 focus:font-bold focus:text-primary-900 focus:ring-2 focus:ring-primary-50"
	>
		<i class="fa-solid fa-check" />
	</Button>
</form>
