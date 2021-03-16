export class PurchasedCoupon {
  public constructor(
    public id: number,
    public userId: number,
    public couponId: number,
    public couponName: string,
    public couponDescription: string,
    public companyName: string,
    public price: number,
    public amountPurchased: number,
    public timestamp: Date
  ) {}
}
