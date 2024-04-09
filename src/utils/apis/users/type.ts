import { z } from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const ProfileSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  handphone: z.string().min(8, { message: "Phone Number minimum length is 8" }),
  ktp: z.string().min(16, { message: "Ktp Number minimum length is 16" }),
  npwp: z.string().min(8, { message: "Phone Number minimum length is 16" }),
  avatar: z
    .instanceof(File)
    .refine((file) => file?.name !== "", "Upload your Avatar picture here")
    .refine(
      (file) => file?.size <= MAX_UPLOAD_SIZE,
      "Max image size is ${MAX_MB}MB"
    )
    .refine(
      (file) => file?.type && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
});

export type ProfileType = z.infer<typeof ProfileSchema>;

export const verificationSchema = z.object({
  photo_ktp: z
    .instanceof(File)
    .refine((file) => file?.name !== "", "Upload your KTP picture here")
    .refine(
      (file) => file?.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) => file?.type && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
  photo_npwp: z
    .instanceof(File)
    .refine((file) => file?.name !== "", "Upload your NPWP picture here")
    .refine(
      (file) => file?.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) => file?.type && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
  photo_selfie: z
    .instanceof(File)
    .refine((file) => file?.name !== "", "Upload your Selfie with KTP here")
    .refine(
      (file) => file?.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) => file?.type && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
});

export type VerificationType = z.infer<typeof verificationSchema>;

export interface TUser {
  fullname: string;
  email: string;
  handphone: string;
  password: string;
  ktp: string;
  npwp: string;
  saldo: number;
  avatar: string;
  photo_ktp: string;
  photo_npwp: string;
  photo_selfie: string;
}

export const ProfileAdminSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  handphone: z.string().min(8, { message: "Phone Number minimum length is 8" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  ktp: z.string().min(16, { message: "Ktp Number minimum length is 16" }),
  npwp: z.string().min(8, { message: "Phone Number minimum length is 16" }),
});

export type ProfileAdminType = z.infer<typeof ProfileAdminSchema>;

export const adminSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export interface IVerif {
  id: number;
  fullname: string;
  photo_ktp: string;
  photo_npwp: string;
  photo_selfie: string;
  ktp: string;
  npwp: string;
  handphone: string;
  is_active: number;
}

export interface VerifUser {
  is_active: number;
}

export interface IVerifBusiness {
  id: number;
  title: string;
  owner: string;
  description: string;
  capital: string;
  share: string;
  proposal: string;
  is_active: number;
}

export interface VerifBusiness {
  is_active: number;
}
