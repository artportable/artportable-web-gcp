export default interface Price {
  amount?: number;
  currency: string;
  id: string;
  product: "portfolioPremium" | "portfolio" | "portfolioMini" | "free";
  productKey: string;
  recurringInterval: string;
}
