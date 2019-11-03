import React from 'react';

import { LayoutStyled, HeaderStyled, TitleStyled, ContentStyled } from './styles';

import Template from './Template';
import TaskCard from './Card';

function Layout(): JSX.Element {
  const arr = [<TaskCard />, <TaskCard />, <TaskCard />, <TaskCard />, <TaskCard />];
  return (
    <LayoutStyled>
      <HeaderStyled>
        <TitleStyled>YATL</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Template />
        {arr.map(data => data)}
      </ContentStyled>
    </LayoutStyled>
  );
}

export default Layout;
