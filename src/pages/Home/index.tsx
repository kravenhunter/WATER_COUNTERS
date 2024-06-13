import { useStore } from '@/store/hooks';
import { Pagination } from '@components';
import { List } from '@modules';
import { observer } from 'mobx-react-lite';

import cn from 'classnames';
import { useCallback, useEffect } from 'react';
import style from './style.module.scss';

// LayOut Component
export const HomePage = observer(() => {
  const store = useStore();

  const nextPage = useCallback((page: number) => {
    if (page > 0) {
      page === 1 && void store.fetchMeters(0);
      page > 1 && void store.fetchMeters(page * 20);
    }
  }, []);

  useEffect(() => {
    if (!store.meters.count_deleted || store.meters.count_deleted) {
      void store.populateAdresses();
    }
  }, [store, store.meters.list.length, store.meters.count_deleted]);

  return (
    <section className={cn(style['wrapper'])}>
      <List
        meters={store.meters.list}
        title='Список счётчиков'
        totalCount={store.meters.count}
      />
      <Pagination totalCount={store.meters.count} selectHandler={nextPage} />
    </section>
  );
});
