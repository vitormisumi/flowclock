import { writable, derived } from 'svelte/store';

export const milliseconds = writable(0);

function createSession() {
	const { subscribe, set, update } = writable({
		running: false,
		start: 0,
		end: 0
	});

	return {
		subscribe,
		start: () =>
			set({
				running: true,
				start: Date.now(),
				end: 0
			}),
		end: () =>
			update((x) => {
				return {
					...x,
					running: false,
					end: Date.now()
				};
			})
	};
}

export const session = createSession();

function createBreak() {
	const { subscribe, set } = writable({
		running: false,
		duration: 0,
		alarmPlayed: false
	});

	return {
		subscribe,
		start: (duration: number) =>
			set({
				running: true,
				duration: duration,
				alarmPlayed: false
			}),
		end: () =>
			set({
				running: false,
				duration: 0,
				alarmPlayed: false
			}),
		alarm: () =>
			set({
				running: true,
				duration: 0,
				alarmPlayed: true
			})
	};
}

export const sessionBreak = createBreak();

export interface Distraction {
	start: number;
	end: number;
	reason: string;
}

function createDistractions() {
	const { subscribe, update, set } = writable<Distraction[]>([]);

	return {
		subscribe,
		start: () =>
			update((x) => [...x, { start: Date.now(), end: 0, reason: "" }]),
		end: (reason: string) =>
			update((x) => {
				if (x.length === 0) {
					return x
				}
				const distractions = [...x];
				const currentDistraction = distractions[x.length - 1];
				distractions[x.length - 1] = {
					...currentDistraction,
					end: Date.now(),
					reason: reason,
				};
				return distractions;
			}),
		reset: () =>
			set([])
	};
}

export const distractions = createDistractions();

export const distractionLength = derived(
	distractions,
	($distractions) => {
		let l: number = 0;
		for (let i = 0; i < $distractions.length; i++) {
			if ($distractions[i].end === 0) {
				l += Date.now() - $distractions[i].start;
			} else {
				l += $distractions[i].end - $distractions[i].start;
			}
		}
		return l
	}
)