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
  pagination: {
    page: number;
    page_size: number;
    total_pages: number;
  };
}

export interface ITokenData {
  exp: number;
  iat: number;
  id: string;
  is_active: number;
  is_admin: boolean;
}

export interface Request {
  status?: string;
  page?: string | number;
}

export interface Meta {
  page: number;
  page_size: number;
  total_pages: number;
}
