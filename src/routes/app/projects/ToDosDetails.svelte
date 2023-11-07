<script lang="ts">
    import { priorityOptions } from "$lib/constants/constants";

	export let toDo: ToDo;
</script>

{#if toDo.description}
	<p class="whitespace-normal text-primary-100">
		{toDo.description}
	</p>
{/if}
<div class="grid w-full grid-cols-2 justify-items-center">
	{#if toDo.due_date}
		<p class="text-primary-100">
			<i class="fa-solid fa-calendar pr-2" />{toDo.due_date}
		</p>
	{:else}
		<p class="text-primary-100">
			<i class="fa-solid fa-calendar pr-2" />No due date
		</p>
	{/if}
	{#if toDo.priority !== null}
		<p class="text-primary-100">
			<i class="fa-solid fa-flag pr-2" />{priorityOptions.find((x) => x.value === toDo.priority)?.name}
		</p>
	{/if}
</div>
