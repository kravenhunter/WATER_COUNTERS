import { IMeter, MeterItem } from '@modules';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import style from './style.module.scss';
interface IProps {
  title: string;
  meters: IMeter[];
  totalCount: number;
}
export const List = observer(({ meters, title }: IProps) => {
  return (
    <>
      <h1>{title}</h1>

      <table className={cn(style['meters'])}>
        <thead>
          <tr>
            <th className={style['meters__number']}>
              <span>№</span>
            </th>
            <th className={style['meters__type']}>Тип</th>
            <th className={style['meters__date']}>Дата установки</th>
            <th className={style['meters__is_automatic']}>Автоматический</th>
            <th className={style['meters__current_data']}>Текущие показания</th>
            <th className={style['meters__adress']}>Адрес</th>
            <th className={style['meters__notuce']}>Примечание</th>
          </tr>
        </thead>
        <tbody>
          {meters.map((meter, indx) => (
            <MeterItem
              key={meter.id}
              id={meter.id}
              number={indx}
              meter={meter}
            />
          ))}
        </tbody>
      </table>
    </>
  );
});
