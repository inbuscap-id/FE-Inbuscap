import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { IResponse, IResponseData, LoginPayload } from "@/utils/types/api";
import { LoginType, RegisterType, VerificationType } from "./types";

export const userLogin = async (body: LoginType) => {
  try {
    const response = await axiosWithConfig.post(`/login`, body);

    return response.data as IResponseData<LoginPayload>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const userRegister = async (body: RegisterType) => {
  try {
    const response = await axiosWithConfig.post(`/user`, body);

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const userVerification = async (body: VerificationType) => {
  try {
    const response = await axiosWithConfig.post(`/verifications`, body);

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
