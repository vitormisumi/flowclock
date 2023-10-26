import { writable, derived } from 'svelte/store';
import { supabase } from '../../../supabase';

export const milliseconds = writable(0);

const realtime = supabase
	.channel('sessions-channel')
	.on('postgres_changes', { event: '*', schema: 'public', table: 'sessions' }, (payload) => {
		console.log(payload);
		if (payload.eventType === 'INSERT') {
			milliseconds.set(Date.now() - Date.parse(payload.new.start))
			console.log(milliseconds)
		}
	})
	.subscribe();

function createSession() {
	const { subscribe, set, update } = writable({
		running: false,
		start: 0,
		end: 0,
		warning: false,
		dismiss: false,
		pause: false,
	});

	return {
		subscribe,
		start: (start: number = Date.now()) =>
			set({
				running: true,
				start: start,
				end: 0,
				warning: false,
				dismiss: false,
				pause: false,
			}),
		end: () =>
			update((x) => {
				return {
					...x,
					running: false,
					end: Date.now(),
					warning: false
				};
			}),
		warning: () =>
			update((x) => {
				return {
					...x,
					warning: true
				}
			}),
		dismiss: () =>
			update((x) => {
				return {
					...x,
					dismiss: true
				}
			}),
		pause: () =>
			update((x) => {
				return {
					...x,
					pause: true
				}
			}),
		unpause: () =>
			update((x) => {
				return {
					...x,
					pause: false
				}
			}),
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

export interface Interruption {
	start: number;
	end: number;
	reason: string;
}

function createInterruptions() {
	const { subscribe, update, set } = writable<Interruption[]>([]);

	return {
		subscribe,
		start: () =>
			update((x) => [...x, { start: Date.now(), end: 0, reason: "" }]),
		end: (reason: string) =>
			update((x) => {
				if (x.length === 0) {
					return x
				}
				const interruptions = [...x];
				const currentInterruption = interruptions[x.length - 1];
				interruptions[x.length - 1] = {
					...currentInterruption,
					end: Date.now(),
					reason: reason,
				};
				return interruptions;
			}),
		reset: () =>
			set([])
	};
}

export const interruptions = createInterruptions();

export const interruptionLength = derived(
	interruptions,
	($interruptions) => {
		let l: number = 0;
		for (let i = 0; i < $interruptions.length; i++) {
			if ($interruptions[i].end === 0) {
				l += Date.now() - $interruptions[i].start;
			} else {
				l += $interruptions[i].end - $interruptions[i].start;
			}
		}
		return l
	}
)