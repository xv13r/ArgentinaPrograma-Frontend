export enum ErrorLevel {
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    FATAL = 'FATAL',
}

export class ErrorMessage {
    private _title!: String;
    private _message!: String;
    private _level!: ErrorLevel;
    private _status!: String;

    public get title(): String {
        return this._title;
    }
    public set title(value: String) {
        this._title = value;
    }
    public get message(): String {
        return this._message;
    }
    public set message(value: String) {
        this._message = value;
    }
    public get level(): ErrorLevel {
        return this._level;
    }
    public set level(value: ErrorLevel) {
        this._level = value;
    }
    public get status(): String {
        return this._status;
    }
    public set status(value: String) {
        this._status = value;
    }
}