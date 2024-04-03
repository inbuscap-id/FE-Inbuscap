import { z } from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const MAX_PDF_SIZE = 20 * 1024 * 1024;
const ACCEPTED_PDF_TYPES = ["application/pdf"];

export const BusinessSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file?.name !== "", "Share your moment with an image")
    .refine(
      (file) => file?.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) => file?.type && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    )
    .optional(),
  title: z
    .string()
    .min(10, { message: "Minimum 10 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  description: z
    .string()
    .min(6, { message: "Minimum 6 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  capital: z.string().min(8, { message: "Phone Number minimum length is 8" }),
  proposal: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_PDF_SIZE, `Max file size is 20 MB`)
    .refine(
      (file) => ACCEPTED_PDF_TYPES.includes(file.type),
      "Only PDF format is supported"
    ),
  // proposal: z.custom<File[]>(),
});

export type BusinessType = z.infer<typeof BusinessSchema>;

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
