<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Button } from 'flowbite-svelte';

	export let buttonStyle: 'regular' | 'accent' | 'red' | 'menu' | 'add' = 'regular';

	let buttonClasses = {
        regular: 'border-none bg-primary-500 text-primary-50 dark:bg-primary-600 dark:text-primary-50 hover:bg-primary-600 hover:dark:bg-primary-700 focus:ring-0 transition-colors',
        accent: 'border-none bg-accent-500 text-accent-50 dark:bg-accent-500 dark:text-accent-50 hover:bg-accent-600 hover:dark:bg-accent-600 focus:ring-0 transition-colors',
        red: 'border-none bg-red-600 text-red-50 dark:bg-red-600 dark:text-red-50 hover:bg-red-700 hover:dark:bg-red-700 focus:ring-0 transition-colors',
        menu: 'border-none bg-transparent text-primary-900 dark:bg-transparent dark:text-primary-50 hover:bg-primary-200 hover:dark:bg-primary-700 focus:ring-0 transition-colors',
        add: 'border-none bg-transparent text-secondary-700 dark:bg-transparent dark:text-secondary-200 hover:bg-secondary-50/50 hover:dark:bg-secondary-900/50 hover:text-primary-500 hover:dark:text-primary-500 focus:ring-0 transition-colors',
    };

	$: combinedClasses = twMerge(buttonClasses[buttonStyle], $$props.class);
</script>

<Button
	{...$$restProps}
	class={combinedClasses}
	on:click
	on:change
	on:keydown
	on:keyup
	on:touchstart
	on:touchend
	on:touchcancel
	on:mouseenter
	on:mouseleave
>
	<slot />
</Button>
