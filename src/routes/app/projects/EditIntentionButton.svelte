<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input, Textarea } from 'flowbite-svelte';
	import { canHover } from '../stores';

	export let intention: Intention;
	export let showMenu;

	let open = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		showMenu = null;
		return async ({ update }) => {
			open = false;
			update();
		};
	};
</script>

<Button size="xs" buttonStyle="menu" on:click={() => (open = true)}>
	<i class="fa-solid fa-pen" />
</Button>
{#if $canHover}
	<Tooltip placement="left">Edit intention</Tooltip>
{/if}
<Modal bind:open outsideclose size="sm">
	<p class="text-lg font-bold dark:text-secondary-50">Edit intention</p>
	<form
		class="flex flex-col gap-2 text-left"
		method="POST"
		action="?/editIntention"
		use:enhance={handleClick}
	>
		<div class="flex flex-wrap">
			<Input
				name="name"
				placeholder="Task name"
				value={intention.name}
				class="border-0 bg-transparent text-xl dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
				required
			></Input>
		</div>
		<Textarea
			name="description"
			placeholder="Description"
			value={intention.description}
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
		></Textarea>
		<input type="number" name="id" hidden value={intention.id} />
		<div class="flex justify-center gap-1">
			<Button
				size="sm"
				buttonStyle="cancel"
				on:click={() => {
					open = false;
					showMenu = null;
				}}
			>
				Cancel
			</Button>
			<Button size="sm" buttonStyle="accent" type="submit" class="self-center">
				<i class="fa-solid fa-save pr-2" />Save
			</Button>
		</div>
	</form>
</Modal>
