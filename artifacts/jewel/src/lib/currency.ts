export function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export const FREE_SHIPPING_THRESHOLD = 5000;
export const STANDARD_SHIPPING_COST = 299;
export const EXPRESS_SHIPPING_COST = 699;
export const GST_RATE = 0.03;
