import { BaseModel } from "./base.model";

export class Social extends BaseModel<Social> {
    public name!: String;
    public url!: String;

    constructor(model?: Partial<Social>) {
        super(model);
    }
}