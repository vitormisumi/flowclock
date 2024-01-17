<script lang="ts">
	import { Button, Tooltip, Input, Modal, Textarea } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { windowWidth } from './stores';

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

<Button
	size="xs"
	class="bg-transparent transition-colors hover:bg-primary-700"
	on:click={() => (open = true)}
>
	<i class="fa-solid fa-pen text-primary-50" />
</Button>
{#if $windowWidth >= 768}
	<Tooltip placement="left">Edit intention</Tooltip>
{/if}
<Modal
	bind:open
	outsideclose
	size="sm"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<p class="text-lg font-bold text-secondary-50">Edit intention</p>
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
				class="border-0 bg-transparent text-xl text-secondary-50 placeholder:text-secondary-500"
				required
			></Input>
		</div>
		<Textarea
			name="description"
			placeholder="Description"
			value={intention.description}
			class="border-0 bg-transparent text-secondary-200 placeholder:text-secondary-500"
		></Textarea>
		<input type="number" name="id" hidden value={intention.id} />
		<div class="flex justify-center gap-1">
			<Button
				size="sm"
				on:click={() => {
					open = false;
					showMenu = null;
				}}>Cancel</Button
			>
			<Button
				size="sm"
				type="submit"
				class="self-center bg-accent-500 transition-colors hover:bg-accent-600"
			>
				<i class="fa-solid fa-save pr-2" />Save
			</Button>
		</div>
	</form>
</Modal>
