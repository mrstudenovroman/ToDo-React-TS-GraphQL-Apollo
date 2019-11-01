import styled from "styled-components";

export const WrapperStyled = styled.div`
  width: 360px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 8px 8px 0 rgba(25, 42, 70, 0.1);
`;

export const TitleStyled = styled.h3`
  width: 100%;
  margin: 0 0 5px 0;
  font-size: 13px;
  font-weight: 400;
  color: #3bb2b8;
  text-align: left;
`;

export const InputStyled = styled.input`
  width: 100%;
  height: 40px;
  margin: 0 0 15px 0;
  padding: 5px 5px 0 5px;
  border: none;
  outline: none;
  border-bottom: 2px solid #bbbbbb;
  font-size: 18px;
  color: #16273a;

  &:hover,
  &:focus {
    border-bottom: 2px solid rgba(59, 178, 184, 0.55);
  }
`;

export const ButtonStyled = styled.button`
  width: 200px;
  height: 40px;
  margin: 10px 0 0 0;
  outline: none;
  border: none;
  border-radius: 32px;
  box-shadow: 0 -2px 10px 0 rgba(59, 178, 184, 0.55);
  background-image: linear-gradient(110deg, #43e695 -49%, #3bb2b8 75%);
  font-size: 18px;
  color: #ffffff;

  &:hover {
  }

  &:active {
    background-image: linear-gradient(110deg, #3bb2b8 -49%, #43e695 75%);
  }
`;
