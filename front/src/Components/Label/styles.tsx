import styled from 'styled-components';

export const LabelStyled = styled.label`
  width: 100%;
  margin: 0 0 5px 0;
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.color || '#3bb2b8'};
  text-align: left;
`;
