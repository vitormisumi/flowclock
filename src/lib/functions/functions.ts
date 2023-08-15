export function millisecondsToClock (milliseconds: number): string {
    let hours = Math.floor(milliseconds / 3600000);
	let minutes = Math.floor((milliseconds / 60000) % 60);
    let seconds = Math.floor((milliseconds / 1000) % 60);
    let h = hours > 9 ? String(hours) : '0' + String(hours);
    let m = minutes > 9 ? String(minutes) : '0' + String(minutes);
    let s = seconds > 9 ? String(seconds) : '0' + String(seconds);
    return h + ":" + m + ":" + s;
}