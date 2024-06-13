export interface IMetterDTO {
  id: string;
  area: { id: string };
  brand_name?: string;
  communication: string;
  description: string | null;
  initial_values: number[];
  installation_date: string;
  is_automatic?: string;
  model_name?: string;
  serial_number: string;
  _type: string[];
}
