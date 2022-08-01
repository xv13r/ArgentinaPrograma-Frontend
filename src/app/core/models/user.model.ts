import { BaseModel } from "./base.model";

export class User extends BaseModel<User> {
    public username!: String;
    public password!: String;
    public email!: String;
    public roles!: String[];

    constructor(model?: Partial<User>) {
        super(model);
    }
}