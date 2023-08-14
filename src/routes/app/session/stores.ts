import { writable } from 'svelte/store';

export const session = writable(false);
export const sessionStart = writable('');
export const sessionEnd = writable('');
export const sessionBreak = writable(false);
export const breakDuration = writable(0);
export const distraction = writable(false);
export const distractionStart = writable(0);
export const distractionEnd = writable(0);
