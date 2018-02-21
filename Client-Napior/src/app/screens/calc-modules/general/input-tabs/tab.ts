export class Tab {
    public title:string;
    public active:boolean;
    public icon:string;
    constructor(title:string, active:boolean, icon:string){
      this.title = title;
      this.active = active;
      this.icon = icon;
    }
}
