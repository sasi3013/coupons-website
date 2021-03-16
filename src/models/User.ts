export class User {
  public constructor(
    public userName: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public userType?: string,
    public companyId?: number,
    public id?: number
  ) {}
}
