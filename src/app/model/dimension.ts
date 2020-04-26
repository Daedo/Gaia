import { AbstractUnit } from './unit';

export abstract class  Dimension {
    constructor(private dimensionName: string) {}

    public get name(): string {
        return this.dimensionName;
    }

    public abstract get units(): AbstractUnit[];
}
