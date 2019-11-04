import React from 'react';

import { InputProps } from './types';

import { InputStyled } from './styles';

function Input({ type, value, onChange, id, placeholder, min, max }: InputProps) {
  return (
    <InputStyled min={min} max={max} type={type} placeholder={placeholder} id={id} value={value} onChange={onChange} />
  );
}

export default Input;
