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

export class Session {
  public token: string;
  public user: User;
}

export class Login {
  public name: string;
  public password: string;

  constructor(object: any) {
    this.name = (object.name) ? object.name : null;
    this.password = (object.password) ? object.password : null;
  }
}
