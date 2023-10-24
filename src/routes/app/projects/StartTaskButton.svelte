<script lang="ts">
	import { Button, Tooltip } from 'flowbite-svelte';
	import { session } from '../session/stores';
</script>

<Button size="xs" class="bg-transparent hover:bg-primary-700" on:click={() => session.start()}>
	<i class="fa-solid fa-clock text-primary-50" />
</Button>
<Tooltip placement="left">Start task</Tooltip>
