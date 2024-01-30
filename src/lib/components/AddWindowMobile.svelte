<script lang="ts">
	import { Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';

	export let hidden: boolean;
	export let bgColor: string;

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
	{transitionParams}
	class="rounded-t-lg {bgColor}"
	bind:hidden
>
	<slot />
</Drawer>
