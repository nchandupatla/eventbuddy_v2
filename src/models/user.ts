export class User {
  constructor(
    public userId: string,
    public firstName: string,
    public lastName: string,
    public profilePic: string,
    public email: string,
    public phone: string,
    public pushToken: string
  ) { }
}
