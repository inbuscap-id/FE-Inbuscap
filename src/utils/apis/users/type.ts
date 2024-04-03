export interface TUser {
  fullname: string;
  email: string;
  handphone: string;
  password: string;
  ktp: string;
  npwp: string;
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

export interface TProposal {
  image: string;
  title: string;
  description: string;
  capital: string;
  proposal: string;
}
