
/**
 * Generic Buffer for storing states.
 * Allows undos/redos.
 */
export class ActionBuffer<T> {
	private data: T[];

	private start: number;
	private current: number;
	private end: number;
	private size: number;

	constructor(size: number) {
		this.data = new Array<T>(size);
		this.size = size;
		this.start = 0;
		this.current = 0;
		this.end = 0;
	}

	/**
	 * Resets the buffer to an empty state
	 */
	public clear(): void {
		this.start = 0;
		this.end = 0;
		this.current = 0;
	}

	public push(element: T): void {
		this.data[this.current] = element;
		this.current = (this.current + 1) % this.size;
		this.end = this.current;
		if (this.end == this.start) {
			this.end = (this.end + 1) % this.size;
		}
	}

	public canUndo(): boolean {
		return this.current != this.start;
	}

	/**
	 * Undos the last action. Returns the new current state.
	 */
	public undo(): T {
		if (!this.canUndo()) {
			throw new Error('Nothing to undo');
		}
		this.current = (this.current - 1 + this.size) % this.size;
		return this.data[this.current];
	}

	public canRedo(): boolean {
		return this.current != this.end;
	}

	/**
	 * Undos the last undo. Returns the new current state.
	 */
	public redo(): T {
		if (!this.canRedo()) {
			throw new Error('Nothing to redo');
		}
		this.current = (this.current + 1) % this.size;
		return this.data[this.current];
	}

	public isEmpty(): boolean {
		return this.start == this.end;
	}

	public getCurrent(): T {
		if (this.isEmpty()) {
			throw new Error('Buffer is empty');
		}
		return this.data[this.current];
	}
}
