import { writable } from "svelte/store";

export const canHover = writable<boolean>();

export const isMobile = writable<boolean>();