import React, { useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { pageGenerate, pageResolver } from './utils';
import { PaginationProps, TasksCountProps } from './types';
import { StyledPageBtn, StyledContainer } from './styles';
import GET_TASK_COUNT from './gql/getTaskCount.gql';

function Pagination({ onClick, currentPage, pageRange = 5 }: PaginationProps): JSX.Element {
  const { data, loading, error } = useQuery<TasksCountProps>(GET_TASK_COUNT);
  const totalPageNumber = (data && Math.ceil(data.tasksConnection.aggregate.count / pageRange)) || 0;

  const pages = pageGenerate(totalPageNumber);

  const firstPage = pages[0];
  const lastePage = pages[totalPageNumber - 1];
  const leftBtnState = currentPage === 1;
  const rightBtnState = currentPage === totalPageNumber;
  const { pagesWithinRange, leftDots, rightDots } = pageResolver(pages, currentPage);

  const leftBtnControll = useCallback(() => {
    if (!leftBtnState) {
      onClick(currentPage - 1);
    }
  }, [currentPage, onClick]);

  const rightBtnControll = useCallback(() => {
    if (!rightBtnState) {
      onClick(currentPage + 1);
    }
  }, [currentPage, onClick]);

  const handleArrowKeyPress = (e: KeyboardEvent) => {
    const { keyCode } = e;
    if (keyCode === 37) {
      leftBtnControll();
    }

    if (keyCode === 39) {
      rightBtnControll();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleArrowKeyPress);

    return () => window.removeEventListener('keydown', handleArrowKeyPress);
  }, [handleArrowKeyPress]);

  if (loading) {
    return <p>'Loading...'</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      {totalPageNumber > 1 && (
        <StyledContainer>
          <StyledPageBtn disabled={leftBtnState} onClick={leftBtnControll}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </StyledPageBtn>
          <StyledPageBtn isActive={currentPage === firstPage} onClick={() => onClick(firstPage)}>
            {firstPage}
          </StyledPageBtn>
          {leftDots && <StyledPageBtn>...</StyledPageBtn>}
          {pagesWithinRange.map(page => {
            if (page === lastePage || page === firstPage) {
              return null;
            }
            return (
              <StyledPageBtn isActive={currentPage === page} key={page} onClick={() => onClick(page)}>
                {page}
              </StyledPageBtn>
            );
          })}
          {rightDots && <StyledPageBtn>...</StyledPageBtn>}
          <StyledPageBtn isActive={currentPage === lastePage} onClick={() => onClick(lastePage)}>
            {lastePage}
          </StyledPageBtn>
          <StyledPageBtn disabled={rightBtnState} onClick={rightBtnControll}>
            <FontAwesomeIcon icon={faArrowRight} />
          </StyledPageBtn>
        </StyledContainer>
      )}
    </>
  );
}

export default Pagination;
