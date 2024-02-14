<script lang="ts">
    import { Tooltip } from "flowbite-svelte";
    import { twMerge } from "tailwind-merge";

    $: combinedClasses = twMerge(
		'bg-secondary-200 text-secondary-900 dark:bg-secondary-700 dark:text-secondary-50',
		$$props.class
	);
</script>

<Tooltip
	{...$$restProps}
	class={combinedClasses}
>
	<slot />
</Tooltip>