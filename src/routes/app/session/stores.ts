import { writable } from 'svelte/store';

export const milliseconds = writable(0);

function createSession() {
	const { subscribe, set, update } = writable({
		id: 0,
		running: false,
		start: 0,
		end: 0,
		warning: false,
		dismiss: false,
		pause: false,
	});
	
	return {
		subscribe,
		start: (id: number = 0, start: number = Date.now()) =>
			set({
				id: id,
				running: true,
				start: start,
				end: 0,
				warning: false,
				dismiss: false,
				pause: false,
				}),
		end: (end: number = Date.now()) =>
			update((x) => {
				return {
					...x,
					running: false,
					end: end,
					warning: false
				};
			}),
		reset: () =>
			set({
				id: 0,
				running: false,
				start: 0,
				end: 0,
				warning: false,
				dismiss: false,
				pause: false,
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

function createInterruptions() {
	const { subscribe, set, update } = writable({
		duration: 0,
		currentId: 0,
		currentStart: 0,
	})

	return {
		subscribe,
		update: (duration: number) =>
			update((x) => {
				return {
					...x,
					duration: duration
				};
			}),
		id: (id: number) =>
			update((x) => {
				return {
					...x,
					currentId: id
				};
			}),
		start: (start: number) =>
			update((x) => {
				return {
					...x,
					currentStart: start
				};
			}),
		end: (end: number) =>
			update((x) => {
				return {
					...x,
					duration: x.duration + (end - x.currentStart)
				};
			}),
		reset: () =>
			set({
				duration: 0,
				currentId: 0,
				currentStart: 0,
			}),
	}
}

export const sessionInterruptions = createInterruptions();

function createFocus() {
	const { subscribe, set, update } = writable({
		type: '',
		id: 0,
	})

	return {
		subscribe,
		set: (type: string, id: number) =>
			set({
				type: type,
				id: id,
			}),
		reset: () =>
			set({
				type: '',
				id: 0,
			}),
	}
}

export const sessionFocus = createFocus();
