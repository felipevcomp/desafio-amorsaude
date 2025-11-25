export interface Clinic {
  id: number;
  company_name: string;
  trade_name: string;
  cnpj: string;
  regional: {
    id: number;
    name: string;
  };
  specialties: {
    id: number;
    name: string;
  }[];
  active: boolean;
  opening_date: string;
}
