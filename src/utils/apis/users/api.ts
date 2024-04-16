import {
  IResponse,
  IResponseData,
  IResponsePagination,
  Request,
} from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import {
  IVerif,
  ProfileAdminType,
  ProfileType,
  TUser,
  VerifUser,
  VerificationType,
} from "./type";
import {
  buildQueryString,
  checkProperty,
  valueFormatData,
} from "@/utils/formatter";

export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get("/users");

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

    const response = await axiosWithConfig.put(`/users`, formData);

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteProfile = async () => {
  try {
    const response = await axiosWithConfig.delete(`/users`);

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
      `/verifications/users`,
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

    const response = await axiosWithConfig.put(`/users`, formData);

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getVerifications = async (params?: Request) => {
  try {
    const query = buildQueryString(params);
    const url = query ? `/verifications/users${query}` : "/verifications/users";

    const response = await axiosWithConfig.get(url);
    return response.data as IResponsePagination<IVerif[]>;
  } catch (error: any) {
    throw Error(error.response.code);
  }
};

export const getVerificationsById = async (user_id: number) => {
  try {
    const response = await axiosWithConfig.get(`/verifications/${user_id}`);

    return response.data as IResponsePagination<IVerif>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const approveUser = async (user_id: number, body: VerifUser) => {
  try {
    const response = await axiosWithConfig.put(
      `/verifications/users/${user_id}`,
      body
    );

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
