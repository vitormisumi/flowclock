<script lang="ts">
    import { twMerge } from 'tailwind-merge';
	import { Radio } from 'flowbite-svelte';

	export let group = '';
	export let value: number | string;

    const newClasses = "cursor-pointer rounded-md border border-transparent p-2 text-primary-900 transition-colors hover:bg-secondary-100 dark:text-primary-50 hover:dark:bg-secondary-800"

    $: combinedClasses = twMerge(newClasses, $$props.class);
</script>

<Radio
	{value}
    class={combinedClasses}
	bind:group
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseenter
	on:mouseleave
	on:mouseover
	on:paste
    {...$$restProps}
>
	<p class="truncate">
		<slot />
	</p>
</Radio>
