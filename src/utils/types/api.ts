export interface Request {
  path?: string;
  query?: string;
  limit?: string | number;
  page?: string | number;
}

export type Response<T = any> = {
  message: string;
  payload: T;
};

export type PayloadPagination<T = any> = {
  currentPage: number;
  datas: T;
  totalItems: number;
  totalPages: number;
};

export interface Meta {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IResponse {
  code: number;
  message: string;
}

export interface IResponseData<TDatas> {
  code: number;
  data: TDatas;
  message: string;
}

export interface IResponsePagination<TDatas> {
  code: number;
  message: string;
  data: TDatas;
  total_pages: number;
}
