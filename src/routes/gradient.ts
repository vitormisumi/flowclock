export function paint(context: CanvasRenderingContext2D, t: number): void {
		const { width, height } = context.canvas;
		const imageData = context.getImageData(0, 0, width, height);

		for (let p = 0; p < imageData.data.length; p += 4) {
			const i = p / 4;
			const x = i % width;
			const y = (i / width) >>> 0;

			const red = 32 + (32 * x) / width + 255 * Math.sin(t / 1000);
			const green = 64;
			const blue = 32 + (32 * x) / width + 32 * Math.sin(t / 500);

			imageData.data[p + 0] = red;
			imageData.data[p + 1] = green;
			imageData.data[p + 2] = blue;
			imageData.data[p + 3] = 255;
		}

		context.putImageData(imageData, 0, 0);
	}