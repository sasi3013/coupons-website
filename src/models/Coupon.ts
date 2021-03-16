export class Coupon {
    public constructor(
      public name: string,
      public price: number,
      public description: string,
      public endDate: Date,
      public category: string,
      public amount: number,
      public companyName?: string,
      public id?: number,
      public startDate?: Date,
      public image?: string
    ) {}
  }