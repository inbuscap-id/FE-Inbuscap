export interface IInvestments {
  id: number;
  fullname: string;
  title: string;
  image: string;
  description: string;
  capital: number;
  collected: number;
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
