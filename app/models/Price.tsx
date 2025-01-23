export default interface Price {
  amount?: number;
  currency: string;
  id: string;
  product: "portfolioPremiumPlus" | "portfolioPremium" | "portfolio" | "free";
  productKey: string;
  recurringInterval: string;
}
