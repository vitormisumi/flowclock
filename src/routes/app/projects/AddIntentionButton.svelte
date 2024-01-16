<script lang="ts">
	import { Button, Input, Textarea } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { selectedProject, windowWidth } from './stores';
	import { afterUpdate } from 'svelte';
	import AddWindowDesktop from './AddWindowDesktop.svelte';
	import AddWindowMobile from './AddWindowMobile.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	let hidden = true;

	let loading = false;

	let formElement: HTMLFormElement;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.append('project_id', String($selectedProject.id));
		return async ({ update }) => {
			loading = false;
			hidden = false;
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
	$: component = $windowWidth < 768 ? AddWindowMobile : AddWindowDesktop;
</script>

{#if hidden || $windowWidth < 768}
	<Button
		size="xs"
		class="w-fit bg-transparent text-secondary-400 transition-colors hover:bg-transparent hover:text-secondary-200"
		on:click={() => (hidden = false)}
	>
		<i class="fa-solid fa-plus pr-2" />add intention
	</Button>
{/if}
<svelte:component this={component} bgColor="bg-primary-900" bind:hidden>
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
			class="border-0 bg-transparent text-lg text-secondary-50 placeholder:text-secondary-500 focus:ring-0"
			required
		></Input>
		<!-- <Label class="pl-2.5 font-normal text-secondary-500"
				>Weekly hours goal
				<input
					type="number"
					name="goal"
					value="0"
					min={0}
					max={100}
					class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500 focus:ring-0"
				/>
			</Label> -->
		<Textarea
			name="description"
			placeholder="Description"
			class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500 focus:ring-0"
		></Textarea>
		<div class="flex justify-end gap-2">
			<div>
				<Button size="xs" disabled={loading} on:click={() => (hidden = true)}>Cancel</Button>
				<Button
					size="xs"
					type="submit"
					class="bg-accent-500 transition-colors hover:bg-accent-600"
					disabled={loading}
				>
					Add Intention
				</Button>
			</div>
		</div>
	</form>
</svelte:component>
