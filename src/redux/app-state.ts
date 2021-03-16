import { Company } from "../models/Company";
import { CouponBasicInfo } from "../models/CouponBasicInfo";
import { PurchasedCoupon } from "../models/PurchasedCoupon";
import { SuccessfulLoginDetails } from "../models/SuccessfulLoginDetails";
import { User } from "../models/User";

export class AppState {
  public coupons: CouponBasicInfo[] = [];
  public isLoggedIn: boolean = false;
  public isDarkMode: boolean = false;
  public purchases: PurchasedCoupon[] = [];
  public companies: Company[] = [];
  public users: User[] = [];
  public successfulLoginDetails: SuccessfulLoginDetails = null;
  public isMobile: boolean = false;
}
