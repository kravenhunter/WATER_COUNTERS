import { useStore } from '@/store/hooks';
import { IconSwitcher } from '@components';
import { IMeter } from '@modules';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import style from './style.module.scss';
interface IProps {
  number: number;
  meter: IMeter;
  id: string;
}

export const MeterItem = observer(({ number, meter, id }: IProps) => {
  const store = useStore();
  const [isBasketVisible, setBasketVisabily] = useState(false);
  const deleteHandler = () => {
    void store.meters.removeItem(id);
  };

  return (
    <tr
      key={meter.id}
      id={id}
      onMouseEnter={() => setBasketVisabily(true)}
      onMouseLeave={() => setBasketVisabily(false)}>
      <td className={style['meters__table__number']}>{++number}</td>
      <td className={style['meters__table__type']}>
        <IconSwitcher type={meter._type[0]} />
      </td>
      <td className={style['meters__table__date']}>
        {meter.installation_date}
      </td>
      <td className={style['meters__table__is_automatic']}>
        {meter.is_automatic ? 'да' : 'нет'}
      </td>
      <td className={style['meters__table__current_data']}>
        {meter.initial_values[0]}
      </td>
      <td className={style['meters__table__adress']}>{meter.adress}</td>
      <td className={style['meters__table__notuce']}>
        <span> {meter.description}</span>
        <span
          onClick={deleteHandler}
          className={cn(!isBasketVisible && style['hide'])}>
          <IconSwitcher type='Basket' />
        </span>
      </td>
    </tr>
  );
});
