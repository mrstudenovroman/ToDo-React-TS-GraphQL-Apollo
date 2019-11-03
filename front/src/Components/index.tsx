import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import GET_TASKS from './gql/getTasks.gql';
import SwitchBtn from './SwitchButton';
import Template from './Template';
import TaskCard from './Card';
import { LayoutStyled, HeaderStyled, WrapperButtonStyled, TitleStyled, ContentStyled } from './styles';
import { LayoutProps, TasksQueryProps } from './types';

function Layout({ handleTheme }: LayoutProps) {
  const { data, loading, error } = useQuery<TasksQueryProps>(GET_TASKS);

  if (loading) return <div>...loading</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <LayoutStyled>
      <HeaderStyled>
        <WrapperButtonStyled>
          <SwitchBtn handleClick={handleTheme} />
          <span>Сменить цвет</span>
        </WrapperButtonStyled>
        <TitleStyled>YATL</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Template />
        {data &&
          data.tasks.map(({ id, deadline, title, priority }) => (
            <TaskCard key={id} id={id} deadline={deadline} priority={priority} title={title} />
          ))}
      </ContentStyled>
    </LayoutStyled>
  );
}

export default Layout;
