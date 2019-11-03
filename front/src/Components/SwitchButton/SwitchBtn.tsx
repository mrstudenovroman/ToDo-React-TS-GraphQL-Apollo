import React from 'react';

import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from './styles';
import { SwitchBtnProps } from './types';

function SwitchBtn({ handleClick }: SwitchBtnProps): JSX.Element {
  return (
    <CheckBoxWrapper>
      <CheckBox onClick={handleClick} id="checkbox" type="checkbox" />
      <CheckBoxLabel htmlFor="checkbox" />
    </CheckBoxWrapper>
  );
}

export default SwitchBtn;
