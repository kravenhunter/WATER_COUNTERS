export interface IHouseDTO {
  id: string;
  address: string;
  fias_addrobjs: string[];
}
export interface IAreaDTO {
  id: string;
  house: IHouseDTO;
  number: number;
  str_number: string;
  str_number_full: string;
}
