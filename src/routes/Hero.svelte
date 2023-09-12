<script lang="ts">
	import { Image } from '@unpic/svelte';
	export let url =
		'https://images.unsplash.com/photo-1483470561301-395323922c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80';
</script>

<Image src={url} alt="Sky" layout="fullWidth" class="opacity-20 absolute"/>
<section class="grid h-screen w-full place-items-center content-center gap-8">
	<h1 class="text-center text-6xl text-secondary-100">Your time,<br />your way</h1>
	<p class="text-secondary-200">The first flowtime app, the evolution of the pomodoro</p>
</section>
