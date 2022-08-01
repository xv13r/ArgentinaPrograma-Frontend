import { BaseModel } from "./base.model";
import { Employment } from "./employment.model";

export class Experience extends BaseModel<Experience> {
    public company!: String;
    public description!: String;
    public imagesId!: String[];
    public startDate!: Date;
    public endDate!: Date;
    public employment!: Employment;

    constructor(model?: Partial<Experience>) {
        super(model);
    }
}