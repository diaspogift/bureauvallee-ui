
export class Customer{
  public id: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public phonenumber: string;
  public country: string;
  public city: string;
  public address: string;
  public created_at: string;
  public updated_at: string;

  constructor(id:string, firstname: string, lastname: string, email: string, phonenumber: string, country: string,
              city: string, address: string, created_at: string, updated_at: string){

    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phonenumber = phonenumber;
    this.country = country;
    this.city = city;
    this.address = address;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

}
