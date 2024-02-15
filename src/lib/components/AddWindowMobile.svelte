<script lang="ts">
	import { Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';

	export let hidden: boolean;
	export let bgColor: 'bg-secondary-50 dark:bg-secondary-900' | 'bg-secondary-100 dark:bg-secondary-800';

	let transitionParams = {
		y: 300,
		duration: 500,
		easing: sineIn
	};
</script>

<Drawer
	placement="bottom"
	width="w-full"
	bottomOffset="bottom-16 md:bottom-24 left-0 overflow-visible"
	transitionType="fly"
	class="rounded-t-lg z-50 {bgColor}"
	bgColor={bgColor === 'bg-secondary-50 dark:bg-secondary-900' ? 'bg-secondary-800' : 'bg-secondary-900'}
	bgOpacity="bg-opacity-80"
	{transitionParams}
	bind:hidden
>
	<slot />
</Drawer>
