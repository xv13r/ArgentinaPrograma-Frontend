import { BaseModel } from "./base.model";

export class Proyect extends BaseModel<Proyect> {
    public name!: String;
    public description!: String;
    public link!: String;
    public created!: Date;
    public imagesId!: String[];

    constructor(model?: Partial<Proyect>) {
        super(model);
    }
}