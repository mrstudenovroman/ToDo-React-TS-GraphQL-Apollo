export interface PaginationProps {
  onClick: (page: number) => void;
  currentPage: number;
  pageRange?: number;
}

export interface StyledBtnProps {
  isActive?: boolean;
}

export interface TasksCountProps {
  tasksConnection: {
    aggregate: {
      count: number;
    };
  };
}
