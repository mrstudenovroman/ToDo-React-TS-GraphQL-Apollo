import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import GET_TASKS from './gql/getTasks.gql';
import Template from './Template';
import TaskCard from './Card';
import { TaskCardProps } from './Card/types';
import { LayoutStyled, HeaderStyled, TitleStyled, ContentStyled } from './styles';

function Layout() {
  const { data, loading, error } = useQuery(GET_TASKS);

  if (loading) return <div>...loading</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  const { tasks = [] } = data;

  return (
    <LayoutStyled>
      <HeaderStyled>
        <TitleStyled>YATL</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Template />
        {tasks.map(({ id, deadline, title, priority }: TaskCardProps) => (
          <TaskCard key={id} id={id} deadline={deadline} priority={priority} title={title} />
        ))}
      </ContentStyled>
    </LayoutStyled>
  );
}

export default Layout;
