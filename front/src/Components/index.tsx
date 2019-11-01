import React from "react";

import Template from "./Template";
import TaskCard from "./Card";
import { LayoutStyled, HeaderStyled, TitleStyled, ContentStyled } from "./styles";

function Layout() {
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
