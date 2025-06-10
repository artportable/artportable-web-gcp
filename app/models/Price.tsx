export default interface Price {
  amount?: number;
  currency: string;
  id: string;
  product: "portfolioPremiumPlus" | "portfolioPremium" | "portfolio" | "portfolioMini" | "free";
  productKey: string;
  recurringInterval: string;
}
