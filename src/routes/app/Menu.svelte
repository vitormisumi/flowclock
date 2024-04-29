<script lang="ts">
	import { page } from '$app/stores';
	import UserMenu from './UserMenu.svelte';

	let menuItems: { title: string; icon: string }[] = [
		{
			title: 'session',
			icon: 'ion:time'
		},
		{
			title: 'projects',
			icon: 'ion:checkbox'
		},
		{
			title: 'dashboard',
			icon: 'ion:pie-chart'
		}
	];

	$: activeUrl = $page.url.pathname;
</script>

<nav>
	<ul class="flex justify-around p-2 sm:justify-center sm:gap-4 landscape:flex-col">
		<UserMenu />
		{#each menuItems as item}
			<li class="transition-all duration-200 hover:scale-105">
				<a
					class="grid aspect-square w-12 cursor-pointer content-center place-items-center rounded-xl text-center md:w-20 {activeUrl ===
					'/app/' + item.title
						? 'bg-primary-500 dark:bg-primary-700'
						: 'transparent hover:bg-primary-500/50 hover:dark:bg-primary-700/50'}"
					href="/app/{item.title}"
				>
					<iconify-icon icon={item.icon} class="text-2xl text-secondary-900 dark:text-secondary-50"/>
					<p class="hidden text-xs capitalize text-secondary-900 dark:text-secondary-50 md:block md:text-sm">{item.title}</p>
				</a>
			</li>
		{/each}
	</ul>
</nav>
