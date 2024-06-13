import { ColdWaterIcon, EnergyIcon, FireIcon, HotWater } from '@components';

export const checkMetterType = (type: string) => {
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

    default:
      return <span>Нет данных</span>;
  }
};
