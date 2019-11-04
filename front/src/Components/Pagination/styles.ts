import styled, { css } from 'styled-components';

import { StyledBtnProps } from './types';

export const StyledContainer = styled.div`
  display: flex;
  background-color: transparent;
  box-shadow: 0 8px 8px 0 rgba(25, 42, 70, 0.1);
  border-radius: 34px;
`;

const ActiveBtnStyles = css`
  opacity: 0.5;
`;

export const StyledPageBtn = styled.button<StyledBtnProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #43e695;
  width: 37px;
  padding: 10px;
  color: #fff;
  cursor: pointer;
  border: none;
  outline: none;
  font-size: 14px;
  transition: background 0.2s ease;
  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
  &:active {
    background: #3bb2b8;
  }
  &:first-child {
    border-radius: 34px 0 0 34px;
  }
  &:last-child {
    border-radius: 0 34px 34px 0;
  }
  ${({ isActive }) => isActive && ActiveBtnStyles}
`;
