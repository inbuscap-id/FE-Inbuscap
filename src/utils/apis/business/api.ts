import { IResponseData, IResponsePagination } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { IBusiness } from "./type";

export const getBusinesses = async () => {
  try {
    const response = await axiosWithConfig("/proposals");

    return response.data as IResponsePagination<IBusiness[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailBusiness = async (proposal_id: string) => {
  try {
    const response = await axiosWithConfig(`/proposals/${proposal_id}`);

    return response.data as IResponseData<IBusiness>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
