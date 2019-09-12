export class User {
  constructor(
    public username: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public nick: string,
    public imageURL: string
  ) { }
}

export class UserLogged{
  public name:string
}
