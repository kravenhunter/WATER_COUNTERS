import { IAreaDTO, IMetterDTO } from '@/core';
import { IArea, IMeter } from '@/modules';

export const converDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const convertMetersData = (meters: IMetterDTO[]) => {
  const convertedData = meters.map((meter) => {
    const newData: IMeter = {
      id: meter.id,
      _type: meter._type,
      description: meter.description,
      initial_values: meter.initial_values,
      installation_date: converDate(meter.installation_date),
      is_automatic: meter.is_automatic ? 'да' : 'нет',
      adress_id: meter.area.id,
    };

    return newData;
  });
  return convertedData;
};
export const convertAreasData = (areas: IAreaDTO[]) => {
  const convertedData = areas.map((area) => {
    const newData: IArea = {
      id: area.id,
      adress: `${area.house.address}, ${area.str_number_full}`,
    };

    return newData;
  });
  return convertedData;
};
