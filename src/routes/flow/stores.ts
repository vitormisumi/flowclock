import { writable } from 'svelte/store';

export const session = writable(false);
export const sessionStart = writable(0);
export const distraction = writable(false);