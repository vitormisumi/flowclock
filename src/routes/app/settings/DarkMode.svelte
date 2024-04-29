<script lang="ts">
	import { Toggle } from 'flowbite-svelte';

	export let darkMode: boolean;

	function handleChange() {
		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}
</script>

<div class="flex items-center">
	<Toggle
		size="small"
		class="text-md text-primary-900 dark:text-primary-50"
		bind:checked={darkMode}
		on:change={handleChange}
	>
		<iconify-icon icon="{darkMode ? 'ion:moon' : 'ion:sunny'}" class="transition-colors"/>
		<p class="pl-2">{darkMode ? 'Dark mode' : 'Light mode'}</p>
	</Toggle>
	<input type="number" name="dark_mode" value={darkMode ? 1 : 0} hidden />
</div>
