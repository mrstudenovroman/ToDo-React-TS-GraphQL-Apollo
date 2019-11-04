import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';

import GET_TASKS from './gql/getTasks.gql';
import SwitchBtn from './SwitchButton';
import Template from './Template';
import TaskCard from './Card';
import Pagination from './Pagination';
import { LayoutStyled, HeaderStyled, WrapperButtonStyled, TitleStyled, ContentStyled } from './styles';
import { LayoutProps, TasksQueryProps } from './types';

function Layout({ handleTheme }: LayoutProps) {
  const [currentPage, switchPage] = useState(0);

  const handleSwitchPage = useCallback(
    (pageFromComponent: number) => {
      const page = pageFromComponent - 1;
      switchPage(page);
    },
    [currentPage, switchPage],
  );

  const pageRange = 5;
  const itemsToSkip = pageRange * currentPage;
  const currentPageToComponent = currentPage + 1;

  const { data, loading, error } = useQuery<TasksQueryProps>(GET_TASKS, {
    variables: {
      skip: itemsToSkip,
      first: itemsToSkip + pageRange,
    },
  });

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
        <Pagination onClick={handleSwitchPage} currentPage={currentPageToComponent} pageRange={pageRange} />
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
