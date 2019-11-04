import styled from 'styled-components';

export const InputStyled = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  padding: 5px 5px 0 5px;
  border: none;
  outline: none;
  border-bottom: 2px solid #bbbbbb;
  font-size: 18px;
  color: #16273a;

  &:hover,
  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.buttonBorderHover};
  }
`;
