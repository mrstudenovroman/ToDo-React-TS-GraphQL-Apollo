import React from 'react';

import { TasksProps } from './types';
import { useQuery } from '@apollo/react-hooks';
import { TasksQueryProps } from '../types';
import GET_TASKS from '../gql/getTasks.gql';

import dayjs from 'dayjs';
import TaskCard from '../Card';

function Tasks({ itemsToSkip, pageRange, filterTitle, filterDeadline }: TasksProps) {
  const { data, loading, error } = useQuery<TasksQueryProps>(GET_TASKS, {
    variables: {
      skip: itemsToSkip,
      first: itemsToSkip + pageRange,
      where: {
        title_contains: filterTitle,
        deadline_gt: filterDeadline ? dayjs().startOf('day') : undefined,
        deadline_lt: filterDeadline ? dayjs().endOf('day') : undefined,
      },
    },
  });

  if (loading) return <div>...loading</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <>
      {data!.tasks.map(({ id, deadline, title, priority }) => (
        <TaskCard key={id} id={id} deadline={deadline} priority={priority} title={title} />
      ))}
    </>
  );
}

export default Tasks;
