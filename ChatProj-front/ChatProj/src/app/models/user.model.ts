export class User {
  constructor(
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public nick: string,
    public avatarUrl: string
  ) { }
}

export class UserLogged{
  public name:string
}
