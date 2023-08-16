<script lang="ts">
	import { page } from '$app/stores';
	import Clock from './Clock.svelte';

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
	class="fixed w-full bg-gradient-to-b from-primary-700 to-secondary-900 bottom-0 left-0 lg:top-0 lg:w-auto lg:h-screen flex lg:flex-col justify-between"
>
	<ul class="flex p-2 justify-around sm:justify-center sm:gap-4 lg:grid">
		{#each menuItems as item}
			<li class="hover:scale-105 transition-all duration-200">
				<a
					class="aspect-square w-12 sm:w-20 text-center rounded-xl grid content-center cursor-pointer"
					style:background={activeUrl === '/app/' + item.title ? '#00000040' : 'transparent'}
					href="/app/{item.title}"
				>
					<i class="fa-solid {item.icon} text-gray-50 text-2xl" />
					<p class="text-xs hidden sm:block sm:text-sm text-gray-50 capitalize">{item.title}</p>
				</a>
			</li>
		{/each}
	</ul>
	{#if activeUrl !== '/app/session'}
		<Clock />
	{/if}
</nav>
