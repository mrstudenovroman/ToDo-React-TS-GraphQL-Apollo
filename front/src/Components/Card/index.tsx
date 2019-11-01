import React, { useCallback } from "react";

import { WrapperStyled, TitleStyled, TextStyled, ButtonStyled } from "./styles";
import { TaskCardProps } from "./types";
import { useMutation } from "@apollo/react-hooks";

import DELETE_TASK from "../Task/graphql/deleteTask.gql";
import GET_TASKS from "../Task/graphql/getTasks.gql";

function TaskCard({ id, title, priority, deadline }: TaskCardProps) {
  const [deleteTask] = useMutation(DELETE_TASK, {
    update(cache, { data: { deleteTask } }) {
      //  @ts-ignore
      const { tasks } = cache.readQuery({ query: GET_TASKS });
      cache.writeQuery({
        query: GET_TASKS,
        //  @ts-ignore
        data: { tasks: tasks.filter(({ id }) => id !== deleteTask.id) }
      });
    }
  });

  const handleChangeTask = useCallback(() => console.log("change"), []);
  const handleDeleteTask = useCallback(() => {
    deleteTask({ variables: { where: { id } } });
  }, []);

  return (
    <WrapperStyled>
      <TitleStyled>Название</TitleStyled>
      <TextStyled>{title}</TextStyled>
      <TitleStyled>Приоритет</TitleStyled>
      <TextStyled>{priority}</TextStyled>
      <TitleStyled>Дедлайн</TitleStyled>
      <TextStyled>{deadline}</TextStyled>
      <ButtonStyled type="button" onClick={handleChangeTask}>
        Редактировать задачу
      </ButtonStyled>
      <ButtonStyled type="button" onClick={handleDeleteTask}>
        Удалить задачу
      </ButtonStyled>
    </WrapperStyled>
  );
}

export default TaskCard;
