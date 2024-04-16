import { z } from "zod";

export interface IInvestments {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  image: string;
  description: string;
  capital: number;
  share: number;
  status: number;
  collected: number;
  amount: number;
}

export interface IDetailInvestment {
  investment: number;
  id: number;
  fullname: string;
  title: string;
  image: string;
  description: string;
  capital: number;
  collected: number;
  profit: number;
  proposal: string;
}

export const topupSchema = z.object({
  bank: z.string().min(1, { message: "Payment type is required" }),
  amount: z.number().min(6, { message: "amount is required" }),
});

export type TopupType = z.infer<typeof topupSchema>;

export const investSchema = z.object({
  proposal_id: z.number(),
  amount: z.number().min(6, { message: "amount is required" }),
});

export type InvestType = z.infer<typeof investSchema>;

export interface ITopup {
  order_id: string;
  amount: number;
  status: string;
  va_numbers: [
    {
      bank: string;
      va_number: string;
    }
  ];
  created_at: string;
  // transaction_id: string;
  // order_id: string;
  // gross_amount: string;
  // payment_type: string;
  // transaction_time: string;
  // transaction_status: string;
  // va_numbers: [
  //   {
  //     bank: string;
  //     va_number: string;
  //   }
  // ];
  // fraud_status: string;
  // currency: string;
}
