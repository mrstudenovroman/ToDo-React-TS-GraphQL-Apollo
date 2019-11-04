import React, { useState, useCallback } from 'react';

import SwitchBtn from './SwitchButton';
import Template from './Template';
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
import { LayoutProps } from './types';
import Tasks from './Tasks';

function Layout({ handleTheme }: LayoutProps) {
  const [deadlineTodayFilter, setDeadlineTodayFilter] = useState<boolean>(false);
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [currentPage, switchPage] = useState<number>(0);

  const toggleDeadlineTodayFilter = useCallback(() => setDeadlineTodayFilter(!deadlineTodayFilter), [
    deadlineTodayFilter,
  ]);

  const handleSetTitleFilter = useCallback(({ target: { value } }): void => setTitleFilter(value), []);

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
        <Tasks
          pageRange={pageRange}
          itemsToSkip={itemsToSkip}
          filterDeadline={deadlineTodayFilter}
          filterTitle={!!titleFilter ? titleFilter : undefined}
        />
        <Pagination
          onClick={handleSwitchPage}
          filterDeadline={deadlineTodayFilter}
          filterTitle={!!titleFilter ? titleFilter : undefined}
          currentPage={currentPageToComponent}
          pageRange={pageRange}
        />
      </ContentStyled>
    </LayoutStyled>
  );
}

export default Layout;
