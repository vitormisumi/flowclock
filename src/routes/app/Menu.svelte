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

<nav
	class="fixed bottom-0 left-0 flex h-16 w-full justify-center bg-gradient-to-b from-primary-700 to-secondary-900 md:h-24 lg:h-screen landscape:top-0 landscape:h-screen landscape:w-16 landscape:flex-col landscape:justify-start landscape:gap-8 landscape:pt-4 landscape:md:w-24 landscape:lg:pt-8"
>
	<UserMenu />
	<ul class="flex justify-around p-2 sm:justify-center sm:gap-4 lg:flex-col landscape:flex-col">
		{#each menuItems as item}
			<li class="transition-all duration-200 hover:scale-105">
				<a
					class="grid aspect-square w-12 cursor-pointer content-center rounded-xl text-center md:w-20"
					style:background={activeUrl === '/app/' + item.title ? '#00000040' : 'transparent'}
					href="/app/{item.title}"
				>
					<i class="fa-solid {item.icon} text-2xl text-gray-50" />
					<p class="hidden text-xs capitalize text-gray-50 md:block md:text-sm">{item.title}</p>
				</a>
			</li>
		{/each}
	</ul>
</nav>
