import { BaseModel } from "./base.model";

export class Employment extends BaseModel<Employment> {
    public name!: String;

    constructor(model?: Partial<Employment>) {
        super(model);
    }
}