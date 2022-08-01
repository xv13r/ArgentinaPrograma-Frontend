import { BaseModel } from "./base.model";

export class Category extends BaseModel<Category> {
    public name!: String;

    constructor(model?: Partial<Category>) {
        super(model);
    }
}