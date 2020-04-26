import * as DATA from './composition-data.json';

class LinearInterpolator {
	xData: number[];
	yData: number[];

	constructor(xData: number[], yData: number[]) {
		this.xData = xData;
		this.yData = yData;
	}

	interpolate(x: number): number {
		if (x < this.xData[0]) {
			// Linear Interpolation
			let x0 = this.xData[0];
			let y0 = this.yData[0];
			let x1 = this.xData[1];
			let y1 = this.yData[1];

			let delta = (y0 - y1) / (x0 - x1);
			let n = y0 - delta * x0;

			return delta * x + n;
		}

		if (x > this.xData[this.xData.length - 1]) {
			return NaN;
		}

		for (let i = 0; i < this.xData.length - 1; i++) {
			if (this.xData[i] <= x && x <= this.xData[i + 1]) {
				let conFac = (x - this.xData[i]) / (this.xData[i + 1] - this.xData[i]);
				return this.yData[i] + (this.yData[i + 1] - this.yData[i]) * conFac;
			}
		}
	}
}

class CompositionInterpolator {
	compositions: {[key: string]: number}[] = [];
	interpolators: LinearInterpolator[] = [];

	constructor() {
		for (const line of DATA['default']) {
			this.compositions.push(line['composition']);
			this.interpolators.push(new LinearInterpolator(line['mass'], line['radius']));
		}
	}

	getComposition(mass, radius) {
		if (radius < this.interpolators[0].interpolate(mass)) {
			return {'Ultraheavy Material': 1};
		}

		if (radius > this.interpolators[this.interpolators.length - 1].interpolate(mass)) {
			return {'Ultralight Material': 1};
		}

		for (let i = 0; i < this.interpolators.length - 1; i++) {
			const radMin = this.interpolators[i].interpolate(mass);
			const radMax = this.interpolators[i + 1].interpolate(mass);

			const minComp = this.compositions[i];
			const maxComp = this.compositions[i + 1];
			if (radMin <= radius && radius <= radMax) {
				const scale = (radius - radMin) / (radMax - radMin);
				return this.interpoleComposition(minComp, maxComp, scale);
			}
		}
	}

	private interpoleComposition(compositionA: { [key: string]: number} , compositionB: { [key: string]: number} , weight: number) {
		if (weight <= 0) {
			return compositionA;
		}

		if (weight >= 1) {
			return compositionB;
		}
		let outComposition = {};

		for (const key in compositionA) {
			if (outComposition[key] === undefined) {
				outComposition[key] = 0;
			}
			outComposition[key] += compositionA[key] * (1 - weight);
		}

		for (const key in compositionB) {
			if (outComposition[key] === undefined) {
				outComposition[key] = 0;
			}
			outComposition[key] += compositionB[key] * weight;
		}
		return outComposition;
	}
}

export const INTERPOLATOR = new CompositionInterpolator();
