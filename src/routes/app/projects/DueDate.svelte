<script lang="ts">
    import { dueDate } from "$lib/functions/functions";
    import { fade } from "svelte/transition";

    export let date: string;
</script>

<p class="text-xs whitespace-nowrap p-2 flex items-center gap-2 {dueDate(date).color}" in:fade>
	<iconify-icon icon="ion:calendar" />{dueDate(date).text}
</p>
