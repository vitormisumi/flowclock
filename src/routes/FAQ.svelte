<script lang="ts">
	import { Accordion, AccordionItem } from 'flowbite-svelte';

	export let faq: HTMLElement;

	const questions = [
		{
			question: 'What is the flowtime technique?',
			answer:
				"The Flowtime Technique is a time management method that allows you to fully immerse yourself in a task and take breaks at natural stopping points. It was created by Zoë Read-Bivens as a solution to the main problem of the Pomodoro Technique, which works in strict time intervals.\n\nHere's how it works:\n1. You pick one task to focus on during a session.\n2. You work on the task for as long as you need to, stopping the clock and taking a break as soon as you start to lose concentration, feel fatigued or finish the task.\n3. Your break time is then calculated based on the length of your session, with a ratio of your choosing.\n\nThe Flowtime Technique is more flexible than the Pomodoro Technique and doesn't force you to take breaks. This allows you to work according to your natural rhythm and energy levels. It's a great method for creatives, students, professionals, and anyone else aiming to improve their concentration."
		},
		{
			question: 'Is FlowClock free?',
			answer:
				'FlowClock is currently entirely free as the app in still in a development stage. There might be a paid version with more advanced features once the app is more mature.'
		},
		{
			question: 'Can I set a specific session to break ratio in FlowClock?',
			answer:
				'Yes! You can set a session to break ratio of anywhere between 1:1 and 10:1.\n\nJust go to "Settings" and choose your desired ratio.'
		},
		{
			question: 'Can I set a session limit in FlowClock?',
			answer:
				'Yes! You can set an alarm to go off after a specific amount of minutes to remind you to take a break.\n\nJust go to "Settings", toggle the option "Session length warning" and set the desired number of minutes. When your session reaches that length, you will receive a sound warning and a message on screen asking whether you want to continue your session or start a break.'
		},
		{
			question: 'What happens if I sign out before finishing my session?',
			answer:
				"If you try to sign out before finishing your session, you will be prompted by a message asking if you want to save your session before signing out. On the other hand, if you just close the app's browser window your session will remain active until you open the app again and close it."
		},
		{
			question: 'Is there a mobile version of FlowClock?',
			answer:
				'There is not currently an Android or iOS version of FlowClock. However, the app should be fully functional on mobile browsers.'
		},
		{
			question: 'What if I find a bug in FlowClock?',
			answer:
				"If you encounter any bugs in the app or have any doubts or sugestions, please don't hesitate to contact us either using the contact form in the main menu or the email flowclock@flowclock.app."
		}
	];
</script>

<section
	class="bg-secondary-900 flex w-full justify-center px-4 py-20 text-secondary-50 sm:px-8 md:px-12 lg:px-20"
	bind:this={faq}
>
	<div class="w-full max-w-4xl">
		<h2 class="pb-8 text-center text-3xl font-bold">FAQ</h2>
		<Accordion class="bg-secondary-700 rounded-t-2xl">
			{#each questions as q}
				<AccordionItem
					class="bg-secondary-800 hover:bg-primary-700 dark:bg-primary-700 hover:dark:bg-secondary-800"
					borderSharedClass="border-secondary-900 dark:border-secondary-900"
				>
					<div slot="arrowdown"><i class="fa-solid fa-chevron-down text-secondary-50" /></div>
					<div slot="arrowup"><i class="fa-solid fa-chevron-up text-secondary-50" /></div>
					<span slot="header" class="font-semibold text-secondary-50">{q.question}</span>
					<p class="whitespace-pre-wrap text-secondary-100">{q.answer}</p>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
</section>
