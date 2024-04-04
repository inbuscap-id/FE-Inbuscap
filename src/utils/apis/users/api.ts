import { IResponse, IResponseData } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { ProfileType, TUser } from "./type";
import { checkProperty, valueFormatData } from "@/utils/formatter";

export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/user"
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
      `https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/user`,
      formData
    );

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteProfile = async () => {
  try {
    const response = await axiosWithConfig.delete(`/user`);

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
