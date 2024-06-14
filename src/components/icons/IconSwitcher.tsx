/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BasketIcon,
  ColdWaterIcon,
  EnergyIcon,
  FireIcon,
  HotWater,
} from '@components';

type SelectType =
  | 'ColdWaterAreaMeter'
  | 'HotWaterAreaMeter'
  | 'WarmAreaMeter'
  | 'EnergyAreaMeter'
  | 'Basket';
interface IProps {
  type: string;
}
export const IconSwitcher = ({ type }: IProps) => {
  switch (type) {
    case 'ColdWaterAreaMeter':
      return (
        <span>
          <ColdWaterIcon /> ХВС
        </span>
      );

    case 'HotWaterAreaMeter':
      return (
        <span>
          <HotWater /> ГВС
        </span>
      );
    case 'WarmAreaMeter':
      return (
        <span>
          <FireIcon /> ТПЛ
        </span>
      );
    case 'EnergyAreaMeter':
      return (
        <span>
          <EnergyIcon /> ЭЛДТ
        </span>
      );
    case 'Basket':
      return <BasketIcon />;

    default:
      return <span>Нет данных</span>;
  }
};
