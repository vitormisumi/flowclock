<script lang="ts">
	import { enhance } from '$app/forms';
	import AddWindowDesktop from '$lib/components/AddWindowDesktop.svelte';
	import AddWindowMobile from '$lib/components/AddWindowMobile.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input, Textarea } from 'flowbite-svelte';
	import { afterUpdate } from 'svelte';
	import { canHover } from '../stores';
	import { selectedProject } from './stores';

	let hidden = true;

	let loading = false;

	let formElement: HTMLFormElement;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.append('project_id', String($selectedProject.id));
		return async ({ update }) => {
			loading = false;
			hidden = true;
			update();
		};
	};

	function scrollToForm() {
		if (formElement) {
			formElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'end' });
		}
	}

	afterUpdate(scrollToForm);

	let component: typeof AddWindowMobile | typeof AddWindowDesktop;
	$: component = $canHover ? AddWindowDesktop : AddWindowMobile;
</script>

{#if hidden || !$canHover}
	<Button size="xs" buttonStyle="add" class="w-full flex items-center gap-2" on:click={() => (hidden = false)}>
		<iconify-icon icon="ion:add" />add intention
	</Button>
{/if}
<svelte:component this={component} bgColor="bg-secondary-50 dark:bg-secondary-900" bind:hidden>
	<form
		class="flex flex-col gap-1 text-left"
		method="POST"
		action="?/addIntention"
		use:enhance={handleClick}
		bind:this={formElement}
	>
		<Input
			name="name"
			placeholder="Intention"
			class="border-0 bg-transparent text-lg focus:ring-0 dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
			required
		></Input>
		<Textarea
			name="description"
			placeholder="Description"
			class="border-0 bg-transparent focus:ring-0 dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
		></Textarea>
		<div class="flex justify-end gap-2">
			<div>
				<Button size="xs" buttonStyle="cancel" disabled={loading} on:click={() => (hidden = true)}
					>Cancel</Button
				>
				<Button size="xs" buttonStyle="accent" type="submit" disabled={loading}>
					Add Intention
				</Button>
			</div>
		</div>
	</form>
</svelte:component>
