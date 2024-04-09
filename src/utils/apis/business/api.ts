import {
  IResponse,
  IResponseData,
  IResponsePagination,
} from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { BusinessSchema, IBusiness } from "./type";
import { checkProperty, valueFormatData } from "@/utils/formatter";

export const getBusinesses = async () => {
  try {
    const response = await axiosWithConfig.get("/proposals");

    return response.data as IResponsePagination<IBusiness[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailBusiness = async (proposal_id: string) => {
  try {
    const response = await axiosWithConfig.get(`/proposals/${proposal_id}`);

    return response.data as IResponseData<IBusiness>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const createBusiness = async (body: BusinessSchema) => {
  try {
    const response = await axiosWithConfig.post(`/proposals`, body);

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateBusiness = async (
  proposal_id: string,
  body: BusinessSchema
) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;
    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.put(
      `/proposals/${proposal_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteBusiness = async (proposal_id: string) => {
  try {
    const response = await axiosWithConfig.delete(`/proposals/${proposal_id}`);

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
