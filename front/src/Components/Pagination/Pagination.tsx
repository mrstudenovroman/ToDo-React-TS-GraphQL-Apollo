import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { pageGenerate, pageResolver } from './utils';
import { PaginationProps } from './types';
import { StyledPageBtn, StyledContainer } from './styles';

function Pagination({ totalPageNumber, onClick, currentPage }: PaginationProps): JSX.Element {
  const pages = pageGenerate(totalPageNumber);

  const leftBtnControll = () => {
    onClick(currentPage - 1);
  };

  const rightBtnControll = () => {
    onClick(currentPage + 1);
  };

  const firstPage = pages[0];
  const lastePage = pages[totalPageNumber - 1];
  const leftBtnState = currentPage === 1;
  const rightBtnState = currentPage === totalPageNumber;
  const { pagesWithinRange, leftDots, rightDots } = pageResolver(pages, currentPage);

  return (
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
  );
}

export default Pagination;
