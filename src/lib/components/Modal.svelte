<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Modal } from 'flowbite-svelte';

	export let open: boolean = false;

	$: combinedClasses = twMerge('bg-primary-50 text-center dark:bg-secondary-900 landscape:left-8 landscape:md:left-12', $$props.class)
</script>

<Modal
	class={combinedClasses}
	{...$$restProps}
	bind:open
>
	<slot />
</Modal>
