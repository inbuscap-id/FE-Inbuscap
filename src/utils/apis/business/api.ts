import {
  IResponse,
  IResponseData,
  IResponsePagination,
  Request,
} from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import {
  IBusiness,
  IVerifBusiness,
  IDetailBusiness,
  VerifBusiness,
  BusinessType,
  UpdateBusinessType,
  IMyBusiness,
} from "./type";
import {
  buildQueryString,
  checkProperty,
  valueFormatData,
} from "@/utils/formatter";

export const getBusinesses = async (params?: Request) => {
  try {
    let query = "";

    if (params) {
      const queryParams: string[] = [];

      let key: keyof typeof params;
      for (key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }

      query = queryParams.join("&");
    }

    const url = query ? `/proposals?${query}` : "/proposals";

    const response = await axiosWithConfig.get(url);

    return response.data as IResponsePagination<IBusiness[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailBusiness = async (proposal_id: string) => {
  try {
    const response = await axiosWithConfig.get(`/proposals/${proposal_id}`);

    return response.data as IResponseData<IDetailBusiness>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getMyBusinesses = async () => {
  try {
    const response = await axiosWithConfig.get("/myproposals");

    return response.data as IResponsePagination<IMyBusiness[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const createBusiness = async (body: BusinessType) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;
    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.post(`/proposals`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateBusiness = async (
  proposal_id: string,
  body: UpdateBusinessType
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

export const getBusinessVerifications = async (params?: Request) => {
  try {
    const query = buildQueryString(params);
    const url = query
      ? `/verifications/proposals${query}`
      : "/verifications/proposals";

    const response = await axiosWithConfig.get(url);

    return response.data as IResponsePagination<IVerifBusiness[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getVerificationsBusinessById = async (proposal_id: number) => {
  try {
    const response = await axiosWithConfig.get(
      `/verifications/proposals/${proposal_id}`
    );

    return response.data as IResponsePagination<IVerifBusiness>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const approveBusiness = async (
  proposal_id: number,
  body: VerifBusiness
) => {
  try {
    const response = await axiosWithConfig.put(
      `/verifications/proposals/${proposal_id}`,
      body
    );

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
