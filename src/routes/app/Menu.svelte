<script lang="ts">
	import { page } from '$app/stores';

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
	class="fixed bottom-0 left-0 grid h-16 w-full items-center bg-gradient-to-b from-primary-700 to-secondary-900 md:h-24 lg:top-0 lg:h-screen lg:w-24 lg:items-start landscape:top-0 landscape:h-screen landscape:w-24"
>
	<ul class="flex justify-around p-2 sm:justify-center sm:gap-4 lg:grid landscape:grid">
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
