import { BaseModel } from "./base.model";
import { Social } from "./social.model";

export class Profile extends BaseModel<Profile> {
    public name!: String;
    public lastname!: String;
    public birthday!: Date;
    public about!: String;
    public title!: String;
    public avatarId?:String;
    public bannerId?:String;
    public socials!:Social[];
    public sections!:any;
    public userId?: String;

    constructor(model?: Partial<Profile>) {
        super(model);
    }
}