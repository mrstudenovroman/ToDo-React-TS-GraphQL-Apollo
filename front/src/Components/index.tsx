import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import dayjs from 'dayjs';

import GET_TASKS from './gql/getTasks.gql';
import SwitchBtn from './SwitchButton';
import Template from './Template';
import TaskCard from './Card';
import {
  LayoutStyled,
  HeaderStyled,
  WrapperButtonStyled,
  TitleStyled,
  ContentStyled,
  WrapperFiltersStyled,
  FilterSectionStyled,
} from './styles';
import Pagination from './Pagination';
import Input from './Input';
import { LayoutProps, TasksQueryProps } from './types';

function Layout({ handleTheme }: LayoutProps) {
  const [deadlineTodayFilter, setDeadlineTodayFilter] = useState<boolean>(false);
  const [titleFilter, setTitleFilter] = useState<string>('');

  const toggleDeadlineTodayFilter = useCallback(() => setDeadlineTodayFilter(!deadlineTodayFilter), [
    deadlineTodayFilter,
  ]);

  const handleSetTitleFilter = useCallback(({ target: { value } }): void => setTitleFilter(value), []);
  const [currentPage, switchPage] = useState<number>(0);

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
      skip: deadlineTodayFilter || titleFilter ? undefined : itemsToSkip,
      first: deadlineTodayFilter || titleFilter ? undefined : itemsToSkip + pageRange,
    },
  });

  if (loading) return <div>...loading</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  let tasksFiltered = data!.tasks;

  if (deadlineTodayFilter || titleFilter) {
    tasksFiltered = tasksFiltered.filter(({ title, deadline }) => {
      if (
        deadlineTodayFilter &&
        !(dayjs(deadline) > dayjs().startOf('day') && dayjs(deadline) < dayjs().endOf('day'))
      ) {
        return false;
      }

      if (titleFilter && !title.includes(titleFilter)) {
        return false;
      }

      return true;
    });
  }

  return (
    <LayoutStyled>
      <HeaderStyled>
        <WrapperButtonStyled>
          <SwitchBtn handleClick={handleTheme} />
          <span>Сменить цвет</span>
        </WrapperButtonStyled>
        <TitleStyled>YATL</TitleStyled>
        <WrapperFiltersStyled>
          <Input
            type="text"
            placeholder="Фильтр по имени"
            id="filter-name"
            value={titleFilter}
            onChange={handleSetTitleFilter}
          />
          <FilterSectionStyled>
            <label htmlFor="filter-date">Показать с дедлайном сегодня</label>
            <input
              type="checkbox"
              id="filter-date"
              checked={deadlineTodayFilter}
              onChange={toggleDeadlineTodayFilter}
            />
          </FilterSectionStyled>
        </WrapperFiltersStyled>
      </HeaderStyled>
      <ContentStyled>
        <Template />
        {tasksFiltered.map(({ id, deadline, title, priority }) => (
          <TaskCard key={id} id={id} deadline={deadline} priority={priority} title={title} />
        ))}
        {!(titleFilter || deadlineTodayFilter) && <Pagination onClick={handleSwitchPage} currentPage={currentPageToComponent} pageRange={pageRange} />}
      </ContentStyled>
    </LayoutStyled>
  );
}

export default Layout;
