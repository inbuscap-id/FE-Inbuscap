import {
  IResponse,
  IResponseData,
  IResponsePagination,
} from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import {
  IDetailInvestment,
  IInvestments,
  ITopup,
  InvestType,
  TopupType,
} from "./type";

export const getInvestments = async () => {
  try {
    const response = await axiosWithConfig.get("/investments");

    return response.data as IResponsePagination<IInvestments[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailInvesment = async (proposal_id: string) => {
  try {
    const response = await axiosWithConfig.get(`/investments/${proposal_id}`);

    return response.data as IResponseData<IDetailInvestment>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const topUp = async (body: TopupType) => {
  try {
    const response = await axiosWithConfig.post("/transactions/topup", body);

    return response.data as IResponseData<ITopup>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const investBusiness = async (body: InvestType) => {
  try {
    const response = await axiosWithConfig.post("/investments", body);

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
