import {
  IResponse,
  IResponseData,
  IResponsePagination,
} from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import {
  IVerif,
  IVerifBusiness,
  ProfileAdminType,
  ProfileType,
  TUser,
  VerifBusiness,
  VerifUser,
  VerificationType,
} from "./type";
import { checkProperty, valueFormatData } from "@/utils/formatter";

export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/users"
    );

    return response.data as IResponseData<TUser>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateUser = async (body: ProfileType) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.put(
      `https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/users`,
      formData
    );

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteProfile = async () => {
  try {
    const response = await axiosWithConfig.delete(
      `https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/users`
    );

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const addVerification = async (body: VerificationType) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.put(
      `https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/verifications/users`,
      formData
    );

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateAdmin = async (body: ProfileAdminType) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.put(
      `https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/users`,
      formData
    );

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getVerifications = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/verifications/users"
    );

    return response.data as IResponsePagination<IVerif[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getVerificationsById = async (user_id: number) => {
  try {
    const response = await axiosWithConfig.get(
      `https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/verifications/${user_id}`
    );

    return response.data as IResponsePagination<IVerif>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const approveUser = async (user_id: number, body: VerifUser) => {
  try {
    const response = await axiosWithConfig.put(
      `https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/verifications/users/${user_id}`,
      body
    );

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getBusinessVerifications = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/verifications/proposals"
    );

    return response.data as IResponsePagination<IVerifBusiness[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getVerificationsBusinessById = async (proposal_id: number) => {
  try {
    const response = await axiosWithConfig.get(
      `https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/verifications/proposals/${proposal_id}`
    );

    return response.data as IResponsePagination<IVerifBusiness>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const approveBusiness = async (proposal_id: number, body: VerifBusiness) => {
  try {
    const response = await axiosWithConfig.put(
      `https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/verifications/proposals/${proposal_id}`,
      body
    );

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
