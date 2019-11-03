import { TaskCardProps } from './Card/types';

export interface LayoutProps {
  handleTheme: () => void;
}

export interface TasksQueryProps {
  tasks: TaskCardProps[];
}
