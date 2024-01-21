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
				'Yes! You can set a session to break ratio of anywhere between 1:1 and 10:1 in the settings page of the app.'
		},
		{
			question: 'What if I find a bug in FlowClock?',
			answer:
				"If you encounter any bugs in the app or have any doubts or sugestions, please don't hesitate to contact us either using the contact form in the main menu or the email flowclock@flowclock.app."
		}
	];
</script>

<section
	class="flex w-full justify-center bg-secondary-100 px-4 py-20 sm:grid-cols-2 sm:px-8 md:px-12 lg:px-20"
	bind:this={faq}
>
	<div class="w-full max-w-4xl">
		<h2 class="pb-8 text-center text-3xl font-bold">FAQ</h2>
		<Accordion>
			{#each questions as q}
				<AccordionItem>
					<span slot="header" class="font-semibold text-primary-900">{q.question}</span>
					<p class="whitespace-pre-wrap text-primary-700">{q.answer}</p>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
</section>
