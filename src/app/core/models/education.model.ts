import { BaseModel } from "./base.model";
import { Category } from "./category.model";

export class Education extends BaseModel<Education> {
    public school!: String;
    public career!: String;
    public imagesId!: String[];
    public startDate!: Date;
    public endDate!: Date;
    public category!: Category;

    constructor(model?: Partial<Education>) {
        super(model);
    }
}