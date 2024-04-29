<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { canHover } from '../stores';

	export let hidden: boolean;
	export let open: boolean;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('hidden', String(hidden));
		return async ({ update }) => {
			open = false;
			update();
		};
	};
</script>

<form method="POST" action="?/hideToDosCard" use:enhance={handleClick}>
	<Button size="xs" buttonStyle="menu" type="submit" on:click={() => (hidden = !hidden)}>
		<iconify-icon icon="{hidden ? 'ion:eye' : 'ion:eye-off'}" />
	</Button>
</form>
{#if $canHover}
	<Tooltip placement="left">
		{hidden ? 'Show card' : 'Hide card'}
	</Tooltip>
{/if}
