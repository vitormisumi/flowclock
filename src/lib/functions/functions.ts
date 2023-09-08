export function millisecondsToClock(milliseconds: number): string {
	let hours = Math.floor(milliseconds / 3600000);
	let minutes = Math.floor((milliseconds / 60000) % 60);
	let seconds = Math.floor((milliseconds / 1000) % 60);
	let h = hours > 9 ? String(hours) : '0' + String(hours);
	let m = minutes > 9 ? String(minutes) : '0' + String(minutes);
	let s = seconds > 9 ? String(seconds) : '0' + String(seconds);
	return h + ':' + m + ':' + s;
}

export function dateFromTimestamp(timestamp: string): string {
	let date = new Date(timestamp);
	let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	let year = date.getFullYear();
	return day + '/' + month + '/' + year;
}

export function timeFromTimestamp(timestamp: string): string {
	let date = new Date(timestamp);
	let hour = date.getHours();
	let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return hour + ':' + minutes + ':' + seconds;
}
