<script lang="ts">
	import { Drawer } from 'flowbite-svelte';

    export let hidden: boolean;
</script>

<Drawer placement="bottom" width="w-full" bottomOffset="bottom-16 md:bottom-24 left-0 overflow-visible" class="rounded-t-lg bg-primary-800" bind:hidden>
	<slot />
</Drawer>
