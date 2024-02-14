<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Modal } from 'flowbite-svelte';

	export let open: boolean = false;

	$: combinedClasses = twMerge(
		'bg-secondary-100 text-center dark:bg-secondary-800 landscape:left-8 landscape:md:left-12 border-none dark:border-none hover:border-none hover:dark:border-none',
		$$props.class
	);
</script>

<Modal class={combinedClasses} backdropClass="fixed inset-0 z-40 bg-secondary-900 bg-opacity-80" {...$$restProps} bind:open>
	<slot />
</Modal>
