import { IResponsePagination } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { IInvestments } from "./type";

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
