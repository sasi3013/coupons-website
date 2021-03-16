import { AppState } from "./app-state";
import { ActionType } from "./action-type";
import { Action } from "./action";
import { Company } from "../models/Company";

// This function is NOT called direcrtly by you
export function reduce(oldAppState: AppState, action: Action): AppState {
  // Cloning the oldState (creating a copy)
  const newAppState = { ...oldAppState };

  switch (action.type) {
    case ActionType.Login:
      newAppState.isLoggedIn = true;
      newAppState.successfulLoginDetails = action.payload;
      break;
    case ActionType.LogOut:
      newAppState.isLoggedIn = false;
      newAppState.successfulLoginDetails = null;
      break;
    case ActionType.GetAllCoupons:
      newAppState.coupons = action.payload;
      break;
    case ActionType.SwitchToDarkMode:
      newAppState.isDarkMode = true;
      break;
    case ActionType.SwitchToLightMode:
      newAppState.isDarkMode = false;
      break;
    case ActionType.GetAllPurchases:
      newAppState.purchases = action.payload;
      break;
    case ActionType.GetAllCompanies:
      newAppState.companies = action.payload;
      let emptyCompany = new Company("", "", "", 0);
      newAppState.companies.unshift(emptyCompany);
      break;
    case ActionType.GetAllUsers:
      newAppState.users = action.payload;
      break;
    case ActionType.SetIsMobile:
      newAppState.isMobile = action.payload;
      break;
    case ActionType.DeleteCoupon:
      const id = action.payload;
      for (let i = 0; i <= newAppState.coupons.length; i++) {
        if (newAppState.coupons[i].id === id) {
          newAppState.coupons.splice(i, 1);
          break;
        }
      }
      break;
  }

  // After returning the new state, it's being published to all subscribers
  // Each component will render itself based on the new state
  return newAppState;
}
