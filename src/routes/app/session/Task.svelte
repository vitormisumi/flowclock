<script>
	import { Badge, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
</script>

<div class="grid justify-items-center gap-4">
	<p class="dark:text-secondary-100">Focusing on:</p>
	<Badge class="dark:bg-accent-400 dark:text-accent-100">Project X</Badge>
	<Button
		class="h-10 w-48 transition-colors focus:ring-secondary-500 dark:bg-secondary-50 dark:text-secondary-900 hover:dark:bg-secondary-100 focus:dark:bg-secondary-200"
	></Button>
	<Dropdown>
		<DropdownItem>Task 1</DropdownItem>
		<DropdownItem>Task 2</DropdownItem>
		<DropdownItem>Task 3</DropdownItem>
		<DropdownItem>Task 4</DropdownItem>
	</Dropdown>
</div>
