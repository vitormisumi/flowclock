<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	export let features: HTMLElement;
	export let faq: HTMLElement;

	function scrollTo(e: HTMLElement) {
		e.scrollIntoView();
	}
</script>

<section
	class="grid w-full bg-gradient-to-b from-secondary-900 to-secondary-800  px-4 py-20 text-secondary-50 sm:px-8 md:px-12 lg:px-20"
>
	<div class="flex items-end justify-between">
		<p class="font-thin text-sm">Developed by Vitor Misumi</p>
		<div class="grid gap-8 justify-items-end">
			<a href="mailto:flowclock@flowclock.app"><i class="fa-solid fa-envelope text-secondary-50"></i></a>
			<ul class="grid gap-4 place-items-end bg-transparent dark:bg-transparent">
				<li>
					<Button href="/blog" size="sm" buttonStyle="transparent" class="text-secondary-50 p-0">Blog</Button>
				</li>
				<li>
					<Button
						size="sm"
						buttonStyle="transparent"
						class="text-secondary-50 p-0"
						on:click={() => scrollTo(features)}
					>
						Features
					</Button>
				</li>
				<li>
					<Button
						size="sm"
						buttonStyle="transparent"
						class="text-secondary-50 p-0"
						on:click={() => scrollTo(faq)}>FAQ</Button
					>
				</li>
			</ul>
		</div>
	</div>
</section>
