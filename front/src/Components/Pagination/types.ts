export interface PaginationProps {
  onClick: (page: number) => void;
  currentPage: number;
  pageRange?: number;
  filterDeadline?: boolean;
  filterTitle?: string;
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
