/*
  Membership pricing and terms, from Rebekah's notes and the Inspection Agreement.
  There's no public price list: each home is priced by its square footage, and the team
  gives the exact price after registration.

  - To join: a one-time startup deposit equal to the yearly fee, plus the first year,
    due when the agreement is signed (Agreement 4.a.i).
  - Renewal years: pay yearly, or monthly on the payment plan: yearly fee / 12, plus a
    monthly administration fee (Agreement 4.a.ii; fee amount from Rebekah).
  - Administrative charge (refunds and transfers): the greater of $100 or one-twelfth of the
    yearly fee (Agreement 3.d.iii and 14).
*/
export const PLAN_ADMIN_FEE = 25; // per month, on the payment plan
export const ADMIN_CHARGE_MIN = 100; // or one-twelfth of the yearly fee, whichever is greater
