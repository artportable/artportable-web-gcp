export default interface Price {
  amount?: number,
  currency: string,
  id: string,
  product: "portfolioPremium" | "portfolio" | "free",
  productKey: string,
  recurringInterval: string,
}
