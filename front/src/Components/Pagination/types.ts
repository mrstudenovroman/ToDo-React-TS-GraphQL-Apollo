export interface PaginationProps {
  onClick: (page: number) => void;
  currentPage: number;
  totalPageNumber: number;
}

export interface StyledBtnProps {
  isActive?: boolean;
}
