import { BaseModel } from "./base.model";

export class Skill extends BaseModel<Skill> {
    public name!: String;
    public description!: String;
    public progress!: Number;

    constructor(model?: Partial<Skill>) {
        super(model);
    }
}