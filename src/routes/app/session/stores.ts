import { writable } from 'svelte/store';

export const milliseconds = writable(0);

function createSession() {
	const { subscribe, set, update } = writable({
		id: '',
		running: false,
		start: 0,
		end: 0,
		warning: false,
		dismiss: false,
		pause: false,
		local: false
	});
	
	return {
		subscribe,
		start: (id: string = '', start: number = Date.now(), local: boolean) =>
			set({
				id: id,
				running: true,
				start: start,
				end: 0,
				warning: false,
				dismiss: false,
				pause: false,
				local: local
			}),
		end: (end: number = Date.now()) =>
			update((x) => {
				return {
					...x,
					id: '',
					running: false,
					end: end,
					warning: false,
					local: false
				};
			}),
		reset: () =>
			set({
				id: '',
				running: false,
				start: 0,
				end: 0,
				warning: false,
				dismiss: false,
				pause: false,
				local: false
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
		start: (id: number, start: number) =>
			update((x) => {
				return {
					...x,
					currentId: id,
					currentStart: start
				};
			}),
		end: (end: number) =>
			update((x) => {
				return {
					...x,
					currentId: 0,
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
	const { subscribe, set } = writable({
		type: '',
		id: '',
		projectId: '',
	})
	
	return {
		subscribe,
		set: (type: 'task' | 'intention' | '', id: string, projectId: string) =>
			set({
				type: type,
				id: id,
				projectId: projectId,
			}),
		reset: () =>
			set({
				type: '',
				id: '',
				projectId: '',
				}),
	}
}

export const sessionFocus = createFocus();

export function startSession(id: string, start: number, local: boolean = false) {
	sessionBreak.end();
	session.start(id, start, local);
}

export function endSession(end: number, duration: number) {
	session.end(end);
	sessionBreak.start(duration);
	sessionInterruptions.reset();
}

export function startInterruption(id: number, start: number) {
	sessionInterruptions.start(id, start);
	session.pause();
}

export function endInterruption(end: number) {
	sessionInterruptions.end(end);
	session.unpause();
}
