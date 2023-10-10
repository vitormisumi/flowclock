<script lang="ts">
	import { Badge, Card } from 'flowbite-svelte';
	import { selectedProject } from './stores';
	import DeleteProjectButton from './DeleteProjectButton.svelte';
	import EditProjectButton from './EditProjectButton.svelte';
</script>

<Card class="h-full w-1/3 min-w-full border-0 bg-primary-800 text-primary-50">
	<div class="flex justify-between">
		<Badge class="bg-accent-500 text-accent-50">{$selectedProject.status}</Badge>
		<div>
			<EditProjectButton />
			<DeleteProjectButton />
		</div>
	</div>
	<p>name: {$selectedProject.name}</p>
	<p>goal: {$selectedProject.goal}</p>
	<p>description: {$selectedProject.description}</p>
</Card>
