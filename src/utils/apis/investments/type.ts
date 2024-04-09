export interface IInvestments {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  image: string;
  description: string;
  capital: number;
  share: number;
  status: number;
  collected: number;
  amount: number;
}

export interface IDetailInvestment {
  investment: number;
  id: number;
  fullname: string;
  title: string;
  image: string;
  description: string;
  capital: number;
  collected: number;
  profit: number;
  proposal: string;
}
