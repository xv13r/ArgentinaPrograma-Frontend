export class Session {
    private _email: String;
    private _accessToken: String;

    constructor(email:String, accessToken:String){
        this._email = email;
        this._accessToken = accessToken;
    }

    public get email(): String {
        return this._email;
    }
    public set email(value: String) {
        this._email = value;
    }

    public get accessToken(): String {
        return this._accessToken;
    }
    public set accessToken(value: String) {
        this._accessToken = value;
    }
}
