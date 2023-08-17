<script lang="ts">
	import Duration from './Duration.svelte';
	import Sessions from './Sessions.svelte';
</script>

<div
	class="h-screen grid p-4 sm:p-6 md:p-8 lg:p-12 lg:ml-24 content-evenly mb-20 sm:mb-24 lg:mb-0 bg-primary-900 overflow-scroll"
>
	<Sessions />
	<Duration />
</div>
