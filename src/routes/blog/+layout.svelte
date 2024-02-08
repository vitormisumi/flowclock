<script>
	import Navbar from './Navbar.svelte';
</script>

<Navbar />
<div class="flex w-full justify-center pt-24 md:pt-40 px-4 sm:px-12">
	<div class="max-w-7xl">
		<slot />
	</div>
</div>
