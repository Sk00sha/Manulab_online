export class Pages {
  id: number;
  img: string;
  page_text: string;
  name:string;
  checked:boolean;
  constructor(id: number,
    img: string,
    page_text: string,
    name:string,
    checked:boolean){
this.id=id;
this.img=img;
this.page_text=page_text;
this.name=name;
this.checked=checked;
  }
  setter(text:string){
    this.page_text = text;
  }
}
