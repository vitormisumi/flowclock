<script lang="ts">
	import { page } from '$app/stores';
	import UserMenu from './UserMenu.svelte';

	let menuItems: { title: string; icon: string }[] = [
		{
			title: 'session',
			icon: 'fa-clock'
		},
		{
			title: 'projects',
			icon: 'fa-square-check'
		},
		{
			title: 'dashboard',
			icon: 'fa-chart-pie'
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
					class="grid aspect-square w-12 cursor-pointer content-center rounded-xl text-center md:w-20 {activeUrl ===
					'/app/' + item.title
						? 'bg-primary-500 dark:bg-primary-700'
						: 'transparent hover:bg-primary-500/30 hover:dark:bg-primary-700/30'}"
					href="/app/{item.title}"
				>
					<i class="fa-solid {item.icon} text-2xl text-secondary-900 dark:text-secondary-50" />
					<p class="hidden text-xs capitalize text-secondary-900 dark:text-secondary-50 md:block md:text-sm">{item.title}</p>
				</a>
			</li>
		{/each}
	</ul>
</nav>
