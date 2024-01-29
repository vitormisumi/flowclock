<script lang="ts">
	import { Select } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	let classes =
		'text-md font-thin text-secondary-900 border-secondary-100 focus:border-primary-500 dark:text-secondary-50 focus:dark:border-primary-500';

	$: combinedClasses = twMerge(classes, $$props.class);
</script>

<Select {...$$restProps} class={combinedClasses}>
	<slot />
</Select>
