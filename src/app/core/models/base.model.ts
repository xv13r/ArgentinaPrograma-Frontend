export abstract class BaseModel<T> {
    public id?: String;
  
    constructor(model?: Partial<T>) {
      if (model) {
        Object.assign(this, model);
      }
    }
  
    public toJson(): any {

      console.log("toJson()");
      console.table(JSON.parse(JSON.stringify(this)));
      console.log("## toJson()");
      return JSON.parse(JSON.stringify(this));
    }
  }