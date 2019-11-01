import React from "react";

import Template from "./Template";
import { LayoutStyled, HeaderStyled, TitleStyled, ContentStyled } from "./styles";

function Layout() {
  return (
    <LayoutStyled>
      <HeaderStyled>
        <TitleStyled>YATL</TitleStyled>
      </HeaderStyled>
      <ContentStyled>
        <Template />
      </ContentStyled>
    </LayoutStyled>
  );
}

export default Layout;
