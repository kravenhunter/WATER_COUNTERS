/* eslint-disable @typescript-eslint/no-unused-vars */
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Li } from './li';
import style from './style.module.scss';
interface IProps {
  totalCount: number;
  selectHandler: (page: number) => void;
}
export const Pagination = React.memo(
  ({ totalCount, selectHandler }: IProps) => {
    const [currentPage, setPage] = useState(1);
    const [pagination, setPagination] = useState({
      current: 1,
      previos: 0,
      next: 2,
    });
    const handler = (target: EventTarget) => {
      if (target instanceof HTMLLIElement) {
        if (target.textContent) {
          if (target.textContent === '≪') {
            setPage(1);
            target.textContent && selectHandler(1);
          } else {
            setPage(parseInt(target.textContent));
            target.textContent && selectHandler(parseInt(target.textContent));
          }
        }
      }
    };
    useEffect(() => {
      setPagination({
        current: currentPage,
        previos: currentPage - 1,
        next: currentPage + 1,
      });
    }, [currentPage, totalCount]);

    return (
      <div className={style['wrapper__pagination']}>
        <ul
          className={style['wrapper__pagination__block']}
          onClick={(event) => handler(event.target)}>
          {/* Показываем нумерацию 1,2,3 пока current  < 3 , когда превысил значение показываем динамическую нумерацию  */}
          {pagination.current < 3 ? (
            <>
              {/* СТатичная нумерация */}
              <Li
                classField={cn(
                  pagination.current === 1 && style['active__page']
                )}
                text='1'
              />
              <Li
                classField={cn(
                  pagination.current === 2 && style['active__page']
                )}
                text='2'
              />
              <Li
                classField={cn(
                  pagination.current === 3 && style['active__page']
                )}
                text='3'
              />
            </>
          ) : (
            <>
              {/* Динамическая  нумерация */}
              {/* Показываем стрелку */}
              <Li text='&#8810;' />
              {/* Показываем пропуск */}
              <Li text='...' />

              <Li text={`${pagination.previos}`} />
              <Li
                classField={style['active__page']}
                text={`${pagination.current}`}
              />
              {pagination.next <= totalCount && (
                <Li text={`${pagination.next}`} />
              )}
            </>
          )}
          {/* Показываем пропуск между нумерациями если разделение большое */}
          {pagination.next < totalCount - 3 && <Li text='...' />}

          {/* СТатичная нумерация */}
          {pagination.next < totalCount - 2 && (
            <Li text={`${totalCount - 2}`} />
          )}
          {pagination.next < totalCount - 1 && (
            <Li text={`${totalCount - 1}`} />
          )}
          {pagination.next < totalCount && <Li text={`${totalCount}`} />}
        </ul>
      </div>
    );
  }
);
Pagination.displayName = 'Pagination';
