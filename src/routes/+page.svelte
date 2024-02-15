<script lang="ts">
	import Hero from './Hero.svelte';
	import Features from './Features.svelte';
	import Faq from './FAQ.svelte';
	import SignUp from './SignUp.svelte';
	import Navbar from './Navbar.svelte';
	import Footer from './Footer.svelte';

	let innerWidth: number;

	let features: HTMLElement;
	let faq: HTMLElement;
</script>

<svelte:window bind:innerWidth />
<div class="flex flex-col">
	<Navbar {innerWidth} {features} {faq} />
	<Hero />
	<Features bind:features />
	<Faq bind:faq />
	<SignUp />
	<Footer {features} {faq}/>
</div>