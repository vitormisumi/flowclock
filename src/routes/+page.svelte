<script lang="ts">
	import Hero from './Hero.svelte';
	import Features from './Features.svelte';
	import Faq from './FAQ.svelte';
	import SignUp from './SignUp.svelte';
	import Navbar from './Navbar.svelte';
</script>

<div class="flex h-screen flex-col">
	<Navbar />
	<div class="grid">
		<Hero />
		<Features />
		<Faq />
		<SignUp />
	</div>
</div>
