import { writable } from 'svelte/store';

function createSession() {
    const { subscribe, set, update } = writable({
        running: false,
        start: 0,
        end: 0,
    });

	return {
		subscribe,
        start: () => set({
            running: true,
            start: Date.now(),
            end: 0,
        }),
        end: () => update((x) => {
            return {
                ...x,
                running: false,
                end: Date.now(),
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
        end: () => set({
            running: false,
            duration: 0,
            alarmPlayed: false,
        }),
        alarm: () => set({
            running: true,
            duration: 0,
            alarmPlayed: true,
        }),
    }
}

export const sessionBreak = createBreak();


export const distraction = writable(false);
export const distractionStart = writable(0);
export const distractionEnd = writable(0);