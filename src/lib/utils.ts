function buildDebouncer(callback: Function, timeout = 300, immediate = false) {
	let timer = 0;
	return (...args: any[]) => {
		if (immediate && !timer) {
			// @ts-ignore
			callback.apply(this, args);
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			// @ts-ignore
			callback.apply(this, args);
		}, timeout);
	};
}

function ellipsisInTheMiddle(str: string, max: number) {
	if (str.length > max) {
		return str.substring(0, max / 2) + '...' + str.substring(str.length - max / 2, str.length);
	}
	return str;
}

function dragAndDropFiles(htmlElement: HTMLElement, callback: (files: FileList) => void, onHoverChange: (hovering: boolean) => void) {
	['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
		htmlElement.addEventListener(eventName, preventDefaults, false);
	});

	function preventDefaults(e: Event) {
		e.preventDefault();
		e.stopPropagation();
	}

	htmlElement.addEventListener('drop', handleDrop, false);

	function handleDrop(e: DragEvent) {
		let dt = e.dataTransfer;
		let files = dt?.files ?? new FileList();
		onHoverChange(false);
		console.log(files);
		callback(files);
	}

	// Additional styling for dragover and dragleave events (optional)
	htmlElement.addEventListener('dragover', () => onHoverChange(true));
	htmlElement.addEventListener('dragleave', () => onHoverChange(false));
}

class BinarySize {
	readonly _bytes: number;

	public static fromBytes(bytes: number) {
		return new BinarySize(bytes);
	}

	public static fromKilobytes(kilobytes: number) {
		return new BinarySize(kilobytes * 1024);
	}

	public static fromMegabytes(megabytes: number) {
		return new BinarySize(megabytes * 1024 * 1024);
	}

	public static fromGigabytes(gigabytes: number) {
		return new BinarySize(gigabytes * 1024 * 1024 * 1024);
	}

	public static fromTerabytes(terabytes: number) {
		return new BinarySize(terabytes * 1024 * 1024 * 1024 * 1024);
	}

	get bytes() {
		return this._bytes;
	}

	get kilobytes() {
		return this._bytes / 1024;
	}

	get megabytes() {
		return this._bytes / (1024 * 1024);
	}

	get gigabytes() {
		return this._bytes / (1024 * 1024 * 1024);
	}

	get terabytes() {
		return this._bytes / (1024 * 1024 * 1024 * 1024);
	}

	toString() {
		const i = Math.floor(Math.log(this._bytes) / Math.log(1024));
		return (this._bytes / Math.pow(1024, i)).toFixed(1) + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
	}

	constructor(bytes: number) {
		this._bytes = bytes;
	}
}

export { buildDebouncer, ellipsisInTheMiddle, dragAndDropFiles, BinarySize };