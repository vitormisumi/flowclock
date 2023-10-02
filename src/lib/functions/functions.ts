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
	if (separator === 0) {
		sep = '/'
	} else if (separator === 1) {
		sep = '-'
	} else {
		sep = '.'
	}
	let date = new Date(timestamp);
	let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	let year = date.getFullYear();
	let shortYear = String(date.getFullYear()).slice(2, 4);
	switch (format) {
		case 'ddmmyyyy':
			return day + sep + month + sep + year;
			break;
		case 'mmddyyyy':
			return month + sep + day + sep + year;
			break;
		case 'yyyymmdd':
			return year + sep + month + sep + day;
			break;
		case 'ddmmyy':
			return day + sep + month + sep + shortYear;
			break;
		case 'mmddyy':
			return month + sep + day + sep + shortYear;
			break;
		case 'yymmdd':
			return shortYear + sep + month + sep + day;
			break;
		default:
			return '';
	};
}

export function timeFromTimestamp(timestamp: string | undefined): string {
	if (timestamp === undefined) {
		return ''
	}
	let date = new Date(timestamp);
	let hour = date.getHours();
	let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return hour + ':' + minutes + ':' + seconds;
}