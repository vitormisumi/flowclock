<div class="fixed h-16 w-screen md:h-20 landscape:h-12 landscape:md:h-16 landscape:lg:h-20">
	<slot name="top-bar" />
</div>
<div
	class="h-[100dvh] w-screen bg-secondary-50 py-16 dark:bg-secondary-900 md:pb-24 md:pt-20 landscape:pb-0 landscape:pl-16 landscape:pt-12 landscape:md:pl-24 landscape:md:pt-16 landscape:lg:pt-20 flex justify-center"
>
	<div class="relative h-full w-full overflow-y-scroll p-4 pt-0 max-w-7xl">
		<slot name="main" />
	</div>
</div>
<div
	class="fixed bottom-0 z-50 h-16 w-screen justify-center bg-gradient-to-b from-secondary-200 to-secondary-50 dark:from-secondary-700 dark:to-secondary-900 md:h-24 landscape:h-screen landscape:w-16 landscape:pt-4 landscape:md:w-24"
>
	<slot name="menu" />
</div>
