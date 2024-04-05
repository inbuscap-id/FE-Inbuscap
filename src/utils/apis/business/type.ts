import { z } from "zod";

export interface IBusiness {
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

export interface AdmBusiness {
  fullname: string;
  title: string;
  description: string;
  capital: number;
  proposal: string;
  collected: number;
  profit: number;
}

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const MAX_PDF_SIZE = 20 * 1024 * 1024;
const ACCEPTED_PDF_TYPES = ["application/pdf"];

export const base = z.object({
  title: z.string().min(6, { message: "Title is required" }),
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
  description: z.string().min(6, { message: "Description is required" }),
  capital: z.string().min(8, { message: "Capital is required" }),
  proposal: z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_PDF_SIZE,
    `Max image size is ${MAX_MB}MB`
  )
  .refine(
    (file) =>
      !file || file.type === "" || ACCEPTED_PDF_TYPES.includes(file.type),
    "Only .pdf formats are supported"
  ),
});

export const addBusinessSchema = z.object({
  mode: z.literal("add"),
})
.merge(base);

export const editBusinessSchema = z.object({
  mode: z.literal("edit"),
})
.merge(base);

export const businessSchema = z.discriminatedUnion("mode", [
  addBusinessSchema,
  editBusinessSchema,
]);


export type BusinessSchema = z.infer<typeof businessSchema>;

export interface INewBusiness {
  id: number;
  title: string;
  image: string;
  description: string;
  capital: string;
  proposal: string;
}