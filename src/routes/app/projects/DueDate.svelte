<script lang="ts">
    import { dueDate } from "$lib/functions/functions";
    import { fade } from "svelte/transition";

    export let date: string;
</script>

<p class="text-sm text-{dueDate(date).color}" in:fade>
	<i class="fa-solid fa-calendar pr-2" />{dueDate(date).text}
</p>
