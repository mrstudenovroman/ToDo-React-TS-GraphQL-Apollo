import React, { useState, useCallback } from "react";

import { WrapperStyled, TitleStyled, InputStyled, ButtonStyled } from "./styles";

function Template() {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [date, setDate] = useState<string>(Date);
  const handleChange = useCallback(() => console.log("click"), []);
  return (
    <WrapperStyled>
      <TitleStyled>Название</TitleStyled>
      <InputStyled type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
      <TitleStyled>Приоритет</TitleStyled>
      <InputStyled type="number" value={priority} onChange={({ target }) => setPriority(target.value)} />
      <TitleStyled>Дедлайн</TitleStyled>
      <InputStyled type="date" value={date} onChange={({ target }) => setDate(target.value)} />
      <ButtonStyled type="button" onClick={handleChange}>
        Создать задачу
      </ButtonStyled>
    </WrapperStyled>
  );
}

export default Template;
