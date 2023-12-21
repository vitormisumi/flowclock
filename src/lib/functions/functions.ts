import { priorityColors, separatorOptions } from "$lib/constants/constants";

export function millisecondsToClock(milliseconds: number): string {
	let hours = Math.floor(milliseconds / 3600000);
	let minutes = Math.floor((milliseconds / 60000) % 60);
	let seconds = Math.floor((milliseconds / 1000) % 60);
	let h = hours > 9 ? String(hours) : '0' + String(hours);
	let m = minutes > 9 ? String(minutes) : '0' + String(minutes);
	let s = seconds > 9 ? String(seconds) : '0' + String(seconds);
	return h + ':' + m + ':' + s;
}

export function dateFromTimestamp(timestamp: string | undefined, format: string, separator: number): string {
	if (timestamp === undefined) {
		return ''
	}
	let sep;
	sep = separatorOptions[separator];
	let date = new Date(timestamp);
	let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	let year = date.getFullYear();
	let shortYear = String(date.getFullYear()).slice(2, 4);
	switch (format) {
		case 'ddmmyyyy':
			return day + sep + month + sep + year;
		case 'mmddyyyy':
			return month + sep + day + sep + year;
		case 'yyyymmdd':
			return year + sep + month + sep + day;
		case 'ddmmyy':
			return day + sep + month + sep + shortYear;
		case 'mmddyy':
			return month + sep + day + sep + shortYear;
		case 'yymmdd':
			return shortYear + sep + month + sep + day;
		default:
			return '';
	};
}

export function timeFromTimestamp(timestamp: string | null | undefined, format: boolean): string {
	if (timestamp === undefined || timestamp === null) {
		return ''
	}
	let date = new Date(timestamp);
	let hour = date.getHours();
	let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	if (format) {
		return (hour < 10 ? '0' + hour : hour) + ':' + minutes + ':' + seconds;
	} else {
		if (hour === 0) {
			return '12:' + minutes + ':' + seconds + ' AM'
		} else if (hour === 12) {
			return hour + ':' + minutes + ':' + seconds + ' PM'
		} else if (hour > 12) {
			return (hour - 12 < 10 ? '0' + (hour - 12) : (hour - 12)) + ':' + minutes + ':' + seconds + ' PM';
		} else {
			return (hour < 10 ? '0' + hour : hour) + ':' + minutes + ':' + seconds + ' AM';
		}
	}
}

export function dueDate(timestamp: string): {text: string, color: string} {
    const parts = timestamp.split('-');
    const dueDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const next_week = new Date();
    next_week.setDate(today.getDate() + 7);
    if (dueDate.toDateString() === yesterday.toDateString()) {
        return { text: 'Yesterday', color: priorityColors[3] };
    } else if (dueDate < yesterday) {
        return { text: dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), color: priorityColors[3] };
    } else if (dueDate.toDateString() === today.toDateString()) {
        return { text: 'Today', color: priorityColors[2] };
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
        return { text: 'Tomorrow', color: priorityColors[1] };
    } else if (dueDate <= next_week) {
        return { text: dueDate.toLocaleDateString('en-US', { weekday: 'long' }), color: priorityColors[0] };
    } else {
        return { text: dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), color: priorityColors[0] };
    }
}
