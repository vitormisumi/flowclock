<script lang="ts">
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { selectedProject } from './stores';
	import type { SubmitFunction } from '@sveltejs/kit';

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.append('project_id', String($selectedProject.id));
		return async ({ update }) => {
			loading = false;
			open = false;
			update();
		};
	};
</script>

{#if open}
	<div
		class="rounded-lg bg-primary-900 p-4 text-center landscape:left-8 landscape:md:left-12"
		transition:slide
	>
		<form
			class="flex flex-col gap-1 text-left"
			method="POST"
			action="?/addIntention"
			use:enhance={handleClick}
		>
			<Input
				name="name"
				placeholder="Intention"
				class="border-0 bg-transparent text-lg text-secondary-50 placeholder:text-secondary-500 focus:ring-0"
				required
			></Input>
			<Label class="pl-2.5 font-normal text-secondary-500"
				>Weekly hours goal
				<input
					type="number"
					name="goal"
					value="0"
					min={0}
					max={100}
					class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500 focus:ring-0"
				/>
			</Label>
			<Textarea
				name="description"
				placeholder="Description"
				class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500 focus:ring-0"
			></Textarea>
			<div class="flex justify-end gap-2">
				<div>
					<Button size="xs" disabled={loading} on:click={() => (open = false)}>Cancel</Button>
					<Button
						size="xs"
						type="submit"
						class="bg-accent-500 hover:bg-accent-600"
						disabled={loading}
					>
						Add Intention
					</Button>
				</div>
			</div>
		</form>
	</div>
{:else}
	<Button
		size="xs"
		class="bg-transparent text-secondary-400 hover:bg-transparent"
		on:click={() => (open = true)}
	>
		<i class="fa-solid fa-plus pr-2" />add intention
	</Button>
{/if}
