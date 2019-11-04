import React from 'react';

import { LabelProps } from './types';

import { LabelStyled } from './styles';

function Label({ htmlFor, children }: LabelProps) {
  return <LabelStyled htmlFor={htmlFor}>{children}</LabelStyled>;
}

export default Label;
