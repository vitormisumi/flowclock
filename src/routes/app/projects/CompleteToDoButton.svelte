<script lang="ts">
	import { enhance } from '$app/forms';
	import { priorityColor } from '$lib/functions/functions';

	export let toDo: ToDo;
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
		class="flex h-5 w-5 items-center justify-center rounded-full border dark:bg-transparent {priorityColor(
			toDo.priority,
			'border'
		)} {toDo.done
			? 'text-secondary-600 hover:text-transparent focus:text-transparent focus:ring-2 focus:ring-primary-700 hover:dark:bg-transparent focus:dark:bg-transparent'
			: 'text-transparent hover:text-primary-50 focus:text-primary-900 focus:ring-2 focus:ring-primary-50 hover:dark:bg-primary-700 focus:dark:bg-primary-50'} transition-all duration-300"
	>
		<i class="fa-solid fa-check" />
	</button>
</form>
