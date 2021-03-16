export class PurchaseRequest {
  public constructor(
    public couponId: number,
    public amount: number,
    public id?: number
  ) {}
}
