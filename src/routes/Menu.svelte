<script lang="ts">
	import { page } from '$app/stores';

	interface Item {
		title: string;
		icon: string;
	}
	let menuItems: Item[] = [
		{
			title: 'flow',
			icon: 'fa-clock'
		},
		{
			title: 'projects',
			icon: 'fa-square-check'
		},
		{
			title: 'dashboard',
			icon: 'fa-chart-pie'
		},
		{
			title: 'settings',
			icon: 'fa-gear'
		}
	];

	$: activeUrl = $page.url.pathname;
</script>

<nav class="fixed w-full bg-gradient-to-b from-primary-500 to-secondary-500 bottom-0">
	<ul class="flex p-2 justify-around sm:justify-center sm:gap-4">
		{#each menuItems as item}
			<li>
				<a
					class="aspect-square w-16 sm:w-20 text-center rounded-xl grid content-center cursor-pointer"
					style:background={activeUrl === '/' + item.title ? '#00000040' : 'transparent'}
					href="/{item.title}"
				>
					<i class="fa-solid {item.icon} text-gray-50 text-2xl" />
					<p class="text-xs sm:text-sm text-gray-50 capitalize">{item.title}</p>
				</a>
			</li>
		{/each}
	</ul>
</nav>
