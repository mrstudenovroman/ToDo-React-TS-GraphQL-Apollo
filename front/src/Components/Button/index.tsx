import React from 'react';

import { ButtonProps } from './types';
import { ButtonStyled } from './styles';

function Button({ onClick, children }: ButtonProps) {
  return (
    <ButtonStyled type="button" onClick={onClick}>
      {children}
    </ButtonStyled>
  );
}

export default Button;
