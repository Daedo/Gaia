import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';


/**
 * Generic Buffer for storing states.
 * Allows undos/redos.
 */
export class ActionBuffer<T> {
	private data: T[];

	private start: number;
	private currentVal: number;
	private end: number;
	private size: number;
	private changeEmitter: EventEmitter<T>;

	private set current(value: number) {
		let sendEvent = this.currentVal != value;
		this.currentVal = value;
		if (sendEvent) {
			if (!this.canUndo()) {
				this.changeEmitter.emit(null);
			} else {
				this.changeEmitter.emit(this.getCurrent());
			}
		}
	}

	private get current(): number {
		return this.currentVal;
	}

	constructor(size: number) {
		this.data = new Array<T>(size);
		this.size = size;
		this.start = 0;
		this.currentVal = 0;
		this.end = 0;
		this.changeEmitter = new EventEmitter();
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
		let next = (this.current + 1) % this.size;
		this.end = next;
		this.current = next;
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
		let pos = (this.current - 1) % this.size;
		return this.data[pos];
	}

	public subscribe(callback: (newState: T) => void): Subscription {
		return this.changeEmitter.subscribe(callback);
	}
}
