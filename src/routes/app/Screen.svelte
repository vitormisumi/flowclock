<div class="fixed h-16 w-screen md:h-20 landscape:h-12 landscape:md:h-16 landscape:lg:h-20">
	<slot name="top-bar" />
</div>
<div
	class="h-[100dvh] w-screen py-16 md:pb-24 md:pt-20 landscape:pb-0 landscape:pl-16 landscape:pt-12 landscape:md:pl-24 landscape:md:pt-16 landscape:lg:pt-20"
>
	<div class="h-full w-full overflow-y-scroll p-4 md:p-8 lg:p-12">
		<slot name="main" />
	</div>
</div>
<div
	class="fixed bottom-0 z-50 h-16 w-screen justify-center bg-gradient-to-b from-primary-700 to-secondary-900 md:h-24 landscape:h-screen landscape:w-16 landscape:pt-4 landscape:md:w-24"
>
	<slot name="menu" />
</div>
