<script lang="ts">
	import { enhance } from '$app/forms';
	import { priorityColors } from '$lib/constants/constants';

	export let toDo: ToDo;

	$: borderColor = 'border-' + priorityColors[toDo.priority];
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
		class="flex h-5 w-5 items-center justify-center rounded-full border {borderColor} bg-transparent {toDo.done
			? 'bg-primary-50 text-secondary-600 hover:bg-transparent hover:text-transparent focus:bg-transparent focus:text-transparent focus:ring-2 focus:ring-primary-700'
			: 'text-transparent hover:bg-primary-700 hover:text-primary-50 focus:bg-primary-50 focus:text-primary-900 focus:ring-2 focus:ring-primary-50'} transition-all duration-300"
	>
		<i class="fa-solid fa-check" />
	</button>
</form>
