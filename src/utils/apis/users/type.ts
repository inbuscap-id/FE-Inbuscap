import { z } from "zod";

export const ProfileSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  handphone: z.string().min(8, { message: "Phone Number minimum length is 8" }),
  ktp: z.string().min(16, { message: "Ktp Number minimum length is 16" }),
  npwp: z.string().min(8, { message: "Phone Number minimum length is 16" }),
});

export type ProfileType = z.infer<typeof ProfileSchema>;

export interface TUser {
  fullname: string;
  email: string;
  handphone: string;
  password: string;
  ktp: string;
  npwp: string;
}

export interface userToLocalstorage {
  fullname: string;
  email: string;
}

export interface TVerification {
  id: number;
  fullname: string;
  photo_ktp: string;
  photo_npwp: string;
  photo_selfie: string;
  ktp: string;
  npwp: string;
  phone: string;
  is_active: boolean;
}
