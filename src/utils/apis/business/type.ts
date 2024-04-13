import { z } from "zod";

export interface IBusiness {
  id: number;
  fullname: string;
  title: string;
  image: string;
  email: string;
  description: string;
  capital: number;
  collected: number;
  share: number;
  proposal: string;
}

export interface IDetailBusiness {
  id: number;
  createdAt: string;
  updatedAt: string;
  user: {
    fullname: string;
    email: string;
    handphone: string;
  };
  title: string;
  image: string;
  document: string;
  description: string;
  capital: number;
  share: number;
  status: number;
  collected: number;
}

export interface IVerifBusiness {
  id: number;
  capital: number;
  description: string;
  title: string;
  owner: string;
  share: number;
  proposal: string;
  status: number;
}

export interface VerifBusiness {
  is_active: number;
}

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const MAX_PDF_SIZE = 20 * 1024 * 1024;
const ACCEPTED_PDF_TYPES = ["application/pdf"];

export const businessSchema = z.object({
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) =>
        !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
  title: z.string().min(6, { message: "Title is required" }),
  description: z.string().min(6, { message: "Description is required" }),
  capital: z.string().min(8, { message: "Capital is required" }),
  share: z.string().min(2, { message: "share profit is required" }),
  proposal: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_PDF_SIZE, `Max PDF size is ${MAX_MB}MB`)
    .refine(
      (file) =>
        !file || file.type === "" || ACCEPTED_PDF_TYPES.includes(file.type),
      "Only .pdf formats are supported"
    ),
});

export const updateBusinessSchema = z.object({
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) =>
        !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    )
    .optional(),
  title: z.string().min(6, { message: "Title is required" }),
  description: z.string().min(6, { message: "Description is required" }),
  capital: z.string().min(8, { message: "Capital is required" }),
  share: z.string().min(2, { message: "share profit is required" }),
  proposal: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_PDF_SIZE, `Max PDF size is ${MAX_MB}MB`)
    .refine(
      (file) =>
        !file || file.type === "" || ACCEPTED_PDF_TYPES.includes(file.type),
      "Only .pdf formats are supported"
    )
    .optional(),
});

export type BusinessType = z.infer<typeof businessSchema>;
export type UpdateBusinessType = z.infer<typeof updateBusinessSchema>;