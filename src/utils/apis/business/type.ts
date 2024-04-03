import { z } from "zod";

export const BusinessSchema = z.object({
  title: z.string().min(10, { message: "Minimum 10 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  description: z.string().min(6, { message: "Minimum 6 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  capital: z.string().min(8, { message: "Phone Number minimum length is 8" }),
  file: z.custom<File[]>(),
});

export interface IBusiness {
  id: number;
  fullname: string;
  title: string;
  image: string;
  description: string;
  capital: number;
  proposal: string;
  collected: number;
  profit: number;
}

export interface AdmBusiness {
  fullname: string;
  title: string;
  description: string;
  capital: number;
  proposal: string;
  collected: number;
  profit: number;
}
