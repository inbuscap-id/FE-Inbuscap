import { IResponseData, IResponsePagination } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { IDetailInvestment, IInvestments } from "./type";

export const getInvestments = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/investments"
    );

    return response.data as IResponsePagination<IInvestments[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailInvesment = async (proposal_id: string) => {
  try {
    const response = await axiosWithConfig.get(
      `https://virtserver.swaggerhub.com/BAGIR3008/Inbuscap/1.0.0/investments/${proposal_id}`
    );

    return response.data as IResponseData<IDetailInvestment>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
