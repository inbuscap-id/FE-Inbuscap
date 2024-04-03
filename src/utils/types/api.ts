export interface IResponse {
  code: number;
  message: string;
}

export interface IResponseData<TDatas> {
  code: number;
  data: TDatas;
  message: string;
}

export interface LoginPayload {
  token: string;
}

export interface IResponsePagination<TDatas> {
  code: number;
  message: string;
  data: TDatas;
  total_pages: number;
}
