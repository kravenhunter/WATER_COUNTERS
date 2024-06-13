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
        current: currentPage < totalCount ? currentPage : totalCount,
        previos: currentPage - 1 > 0 ? currentPage - 1 : 0,
        next: currentPage + 1 < totalCount ? currentPage + 1 : totalCount,
      });
    }, [currentPage, totalCount]);

    return (
      <div className={style['wrapper__pagination']}>
        <ul
          className={style['wrapper__pagination__block']}
          onClick={(event) => handler(event.target)}>
          {pagination.previos - 1 > 1 && <Li text='&#8810;' />}
          {pagination.previos - 1 > 2 && <Li text='...' />}
          {pagination.previos - 1 > 0 && (
            <Li text={`${pagination.previos - 1}`} />
          )}
          {pagination.previos > 0 && <Li text={`${pagination.previos}`} />}
          <Li
            classField={style['active__page']}
            text={`${pagination.current}`}
          />

          {pagination.next < totalCount - 2 &&
          pagination.next < totalCount - 1 ? (
            <>
              <Li text={`${pagination.next}`} />
              {pagination.next < totalCount - 3 && <Li text='...' />}
              <Li text={`${totalCount - 2}`} />
              <Li text={`${totalCount - 1}`} />
              <Li text={`${totalCount}`} />
            </>
          ) : (
            pagination.current !== totalCount && (
              <>
                {pagination.next < totalCount ? (
                  <>
                    <Li text={`${pagination.next}`} />
                    <Li text={`${totalCount}`} />
                  </>
                ) : (
                  <Li text={`${totalCount}`} />
                )}
              </>
            )
          )}

          {/* 
             {pagination.next < totalCount && <Li text={`${pagination.next}`} />}
          {pagination.next < totalCount - 3 && <Li text='...' />}

          {pagination.next + 1 < totalCount - 2 && (
            <Li text={`${totalCount - 2}`} />
          )}

          {pagination.next + 1 < totalCount - 1 && (
            <Li text={`${totalCount - 1}`} />
          )}
          {pagination.next + 1 < totalCount && <Li text={`${totalCount}`} />} */}
        </ul>
      </div>
    );
  }
);
Pagination.displayName = 'Pagination';
