export class CouponBasicInfo {
  public constructor(
    public id: number,
    public name: string,
    public price: number,
    public endDate: Date,
    public companyName: string,
    public category: string,
    public image: string
  ) {}
}
