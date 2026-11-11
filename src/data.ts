export type Status =
  | "succeeded"
  | "processing"
  | "failed"
  | "refunded"
  | "requires_action";
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  created: string;
}
export interface Payment {
  id: string;
  customerId: string;
  amount: number;
  currency: string;
  status: Status;
  method: string;
  created: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  active: boolean;
}
let s = 11;
const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
const pick = <T>(a: T[]) => a[Math.floor(r() * a.length)];
const DAY = 864e5;
const names = [
  "Adebayo Ogunleye",
  "Chinedu Okeke",
  "Aisha Bello",
  "Folake Adeyemi",
  "Emeka Nwosu",
  "Ibrahim Musa",
  "Ngozi Eze",
  "Tunde Balogun",
  "Chiamaka Obi",
  "Yusuf Abdullahi",
  "Oluwaseun Afolabi",
  "Ifeanyi Okonkwo",
  "Zainab Suleiman",
  "Kehinde Olawale",
  "Amaka Nnamdi",
  "Sani Garba",
];
export const customers: Customer[] = names.map((n, i) => ({
  id:
    "cus_" +
    Math.floor(r() * 1e9)
      .toString(36)
      .toUpperCase()
      .padEnd(8, "Q"),
  name: n,
  email: n.toLowerCase().replace(" ", ".") + "@example.com",
  phone: "+234 803 " + String(100 + i) + " " + String(1000 + i * 37),
  created: new Date(Date.now() - r() * 300 * DAY).toISOString(),
}));
const statuses: Status[] = [
  "succeeded",
  "succeeded",
  "succeeded",
  "succeeded",
  "succeeded",
  "processing",
  "failed",
  "refunded",
  "requires_action",
];
export const payments: Payment[] = Array.from({ length: 64 }, () => ({
  id:
    "pi_" +
    Math.floor(r() * 1e12)
      .toString(36)
      .toUpperCase()
      .padEnd(10, "X"),
  customerId: pick(customers).id,
  amount: Math.round((500 + r() * 34500) / 100) * 100 - 1,
  currency: "USD",
  status: pick(statuses),
  method: pick([
    "Visa •••• 4242",
    "Mastercard •••• 4444",
    "Amex •••• 0005",
    "Apple Pay",
    "Google Pay",
    "SEPA Debit",
  ]),
  created: new Date(Date.now() - r() * 60 * DAY).toISOString(),
})).sort((a, b) => +new Date(b.created) - +new Date(a.created));
export const products: Product[] = [
  ["Pro Plan (monthly)", "Full access, up to 10 seats", 4900],
  ["Pro Plan (annual)", "Full access, billed yearly", 49000],
  ["Starter Plan", "For individuals and small teams", 1900],
  ["Onboarding Package", "One-time setup and training", 29900],
  ["Extra Seat", "Add-on seat for Pro", 900],
  ["Priority Support", "24/7 priority support", 9900],
].map((p, i) => ({
  id: "prod_" + (1000 + i),
  name: p[0] as string,
  description: p[1] as string,
  price: p[2] as number,
  currency: "USD",
  active: i !== 4,
}));
export const fmt = (c: number, cur = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: cur }).format(
    c / 100,
  );
export const dt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
export const daily = Array.from({ length: 90 }, (_, i) => {
  const d = new Date(Date.now() - (89 - i) * DAY);
  const base = 4200 + i * 22 + Math.sin(i / 3) * 900 + r() * 1200;
  return {
    date: d.toISOString(),
    label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    volume: Math.round(base),
    prev: Math.round(base * (0.82 + r() * 0.12)),
  };
});
export const statusLabel: Record<Status, string> = {
  succeeded: "Succeeded",
  processing: "Processing",
  failed: "Failed",
  refunded: "Refunded",
  requires_action: "Requires action",
};
