import { writable } from 'svelte/store';

function createSession() {
    const { subscribe, set, update } = writable({
        running: false,
        start: '',
        end: '',
    });

	return {
		subscribe,
        start: () => set({
            running: true,
            start: new Date().toISOString(),
            end: '',
        }),
        end: () => update((x) => {
            return {
                ...x,
                running: false,
                end: new Date().toISOString()
            }
        }),
	};
}

export const session = createSession();

function createBreak() {
    const { subscribe, set } = writable({
        running: false,
        duration: 0,
        alarmPlayed: false,
    });
    
    return {
        subscribe,
        start: (duration: number) => set({
            running: true,
            duration: duration,
            alarmPlayed: false,
        }),
        stop: () => set({
            running: false,
            duration: 0,
            alarmPlayed: true,
        }),
    }
}

export const sessionBreak = createBreak();

export const distraction = writable(false);
export const distractionStart = writable(0);
export const distractionEnd = writable(0);