export function naira(amount: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);
}
export const BUSINESS_PHONE = "09017652705";
export const WHATSAPP_NUMBER = "2349017652705";
