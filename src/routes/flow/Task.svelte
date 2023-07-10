<script>
	import { Badge, Button, Chevron, Dropdown, DropdownItem } from 'flowbite-svelte';
</script>

<div class="grid justify-items-center gap-4">
	<p class="text-secondary-100">Focusing on:</p>
	<Badge class="bg-accent-400 text-accent-100">Project X</Badge>
	<Button class="bg-secondary-50 hover:bg-secondary-100 focus:bg-secondary-200 focus:ring-secondary-500 text-secondary-900 w-48 h-10"><Chevron>Task Y</Chevron></Button>
	<Dropdown>
		<DropdownItem>Task 1</DropdownItem>
		<DropdownItem>Task 2</DropdownItem>
		<DropdownItem>Task 3</DropdownItem>
		<DropdownItem>Task 4</DropdownItem>
	</Dropdown>
</div>
