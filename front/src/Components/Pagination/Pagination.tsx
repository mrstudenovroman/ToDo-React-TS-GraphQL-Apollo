import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { pageGenerate } from "./utils";

const StyledContainer = styled.div`
  display: flex;
  box-shadow: 0 -6px 12px 0 rgba(25, 42, 70, 0.08);
  background-color: #ffffff;
`;

const StyledPageBtn = styled.button`
  display: flex;
  background: #43e695;
  padding: 5px;
  color: #fff;
  cursor: pointer;
  border: none;
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  &:last-child {
    border-radius: 0 4px 4px 0;
  }
`;

interface PaginationProps {
  onClick: (page: number) => void;
  currentPage: number;
  totalPageNumber: number;
  pageRange?: number;
}

function Pagination({
  totalPageNumber,
  onClick
}: PaginationProps): JSX.Element {
  const pages = pageGenerate(totalPageNumber);

  return (
    <StyledContainer>
      {pages.map(page => (
        <StyledPageBtn key={page} onClick={() => onClick(page)}>
          {page}
        </StyledPageBtn>
      ))}
    </StyledContainer>
  );
}

export default Pagination;
