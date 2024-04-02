import { IResponsePagination } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { IProposals } from "./type";

export const getProposals = async () => {
  try {
    const response = await axiosWithConfig("/proposals");

    return response.data as IResponsePagination<IProposals[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
