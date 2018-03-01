
export class User{
  private id: number;
  private email: string;
  private name: string;
  private canwritearticle: boolean;
  private canpublisharticle: boolean;
  private token: string;




  constructor( id: number, email: string,  name: string, canwritearticle: boolean, canpublisharticle: boolean, token: string){
    this.id = id;
    this.email = email;
    this.name = name;
    this.canwritearticle = canwritearticle;
    this.canpublisharticle = canpublisharticle;
    this.token = token;
  }

  getId():number{
    return this.id;
  }

  getEmail():string{
    return this.email;
  }
  getName():string{
    return this.name;
  }

  setId(id:number){
    this.id = id;
  }
  setEmail(email:string){
    this.email = email;
  }
  setName(name:string){
    this.name = name;
  }

  setCanwritearticle(canwritearticle: boolean){
    this.canwritearticle = canwritearticle;
  }

  setCanpublisharticle(canpublisharticle: boolean){
    this.canpublisharticle = canpublisharticle;
  }

  setToken(token: string){
    this.token = token;
  }


  getToken():string{
    return this.token;
  }

  getCanwritearticle():boolean{
    return this.canwritearticle;
  }

  getCanpublisharticle():boolean{
    return this.canpublisharticle;
  }
}


