export interface IMeter {
  id: string;
  _type: string[];
  installation_date: string;
  is_automatic?: string;
  initial_values: number[];
  adress_id: string;
  adress?: string;
  description: string | null;
}
