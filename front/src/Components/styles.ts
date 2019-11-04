import styled from 'styled-components';

export const LayoutStyled = styled.div`
  min-width: 1160px;
  display: grid;
  grid-template-areas: 'Header' 'Content';
  grid-template-columns: 1fr;
  grid-auto-rows: 100px 1fr;
  grid-row-gap: 20px;
`;

export const HeaderStyled = styled.header`
  display: grid;
  grid-area: Header;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  justify-items: center;
  align-content: center;
`;

export const WrapperButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WrapperFiltersStyled = styled(WrapperButtonStyled)`
  flex-direction: column;
`;

export const FilterSectionStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;


export const TitleStyled = styled.h1`
  font-size: 40px;
  display: flex;
  align-items: center;
  margin: 0;
`;

export const ContentStyled = styled.div`
  display: grid;
  grid-area: Content;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 50px;
  justify-items: center;
  align-content: center;
  padding: 0 20px;
  margin: 0 0 50px 0;
`;
