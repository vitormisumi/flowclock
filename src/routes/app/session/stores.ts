import { writable } from 'svelte/store';

export const session = writable(false);
export const sessionBreak = writable(false);
export const sessionStart = writable(0);
export const sessionEnd = writable(0);
export const breakTimer = writable(0);
export const distraction = writable(false);
export const distractionStart = writable(0);
export const distractionEnd = writable(0);
