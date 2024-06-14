import { IMeter, MeterItem } from '@modules';

// import { IconSwitcher } from '@components';
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
      <h1 className={style['meters__title']}>{title}</h1>

      <div className={cn(style['meters__table'])}>
        <table className={cn(style['meters__table__head'])}>
          <thead>
            <tr>
              <th className={style['meters__table__number']}>
                <span>№</span>
              </th>
              <th className={style['meters__table__type']}>Тип</th>
              <th className={style['meters__table__date']}>Дата установки</th>
              <th className={style['meters__table__is_automatic']}>
                Автоматический
              </th>
              <th className={style['meters__table__current_data']}>
                Текущие показания
              </th>
              <th className={style['meters__table__adress']}>Адрес</th>
              <th className={style['meters__table__notuce']}>Примечание</th>
            </tr>
          </thead>
        </table>

        <div className={cn(style['meters__table__body'])}>
          <table>
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
        </div>
      </div>
    </>
  );
});
