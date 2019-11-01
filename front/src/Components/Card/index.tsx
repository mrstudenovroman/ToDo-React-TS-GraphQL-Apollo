import React, { useState, useCallback } from "react";

import { WrapperStyled, TitleStyled, TextStyled, ButtonStyled } from "./styles";

function TaskCard() {
  const changeTask = useCallback(() => console.log("change"), []);
  const deleteTask = useCallback(() => console.log("delete"), []);
  return (
    <WrapperStyled>
      <TitleStyled>Название</TitleStyled>
      <TextStyled>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt laboriosam neque obcaecati minima blanditiis explicabo
        vero nobis dolorum id, rerum nemo, magnam eius, aspernatur iusto quo deleniti eos architecto sequi!
      </TextStyled>
      <TitleStyled>Приоритет</TitleStyled>
      <TextStyled>1</TextStyled>
      <TitleStyled>Дедлайн</TitleStyled>
      <TextStyled>Дата</TextStyled>
      <ButtonStyled type="button" onClick={changeTask}>
        Редактировать задачу
      </ButtonStyled>
      <ButtonStyled type="button" onClick={deleteTask}>
        Удалить задачу
      </ButtonStyled>
    </WrapperStyled>
  );
}

export default TaskCard;
