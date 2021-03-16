export class SuccessfulLoginDetails {
  public constructor(
    public userId?: number,
    public companyId?: number,
    public token?: number,
    public userType?: string
  ) {}
}
