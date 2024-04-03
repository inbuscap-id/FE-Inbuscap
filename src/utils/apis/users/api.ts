import { IResponseData } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { TUser } from "./type";

export const getUser = async () => {
  try {
    const response = await axiosWithConfig("/user");

    return response.data as IResponseData<TUser>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
