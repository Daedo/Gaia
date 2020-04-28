
class UUIDGenerator {
	private counter;
	constructor() {
		this.counter = 0;
	}

	getNext(): string {
		let out = this.counter + '';
		this.counter++;
		return out;
	}
}

export const UUID = new UUIDGenerator();