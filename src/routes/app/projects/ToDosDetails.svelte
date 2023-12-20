<script lang="ts">
	export let toDo: ToDo;
</script>

{#if toDo.description}
	<p class="whitespace-normal text-primary-100">
		{toDo.description}
	</p>
{/if}
