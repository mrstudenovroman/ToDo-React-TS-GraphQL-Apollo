import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import UPDATE_TASK from './gql/updateTask.gql';
import DELETE_TASK from './gql/deleteTask.gql';

import { WrapperStyled, TitleStyled, TextStyled, InputStyled, ButtonStyled } from './styles';
import { TaskCardProps } from './types';

function TaskCard({ id, title, priority, deadline }: TaskCardProps) {
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK, {
    variables: { where: { id } },
    refetchQueries: ['getTasks'],
  });

  const [isChangeTask, setChangeTask] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newPriority, setNewPriority] = useState(priority);
  const [newDeadline, setNewDeadLine] = useState(deadline);

  const handleChangeTask = useCallback(
    () => {
      updateTask({
        variables: {
          where: { id },
          data: {
            title: newTitle,
            priority: +newPriority,
            deadline: newDeadline,
          },
        },
      }).then(() => setChangeTask(false));
    },
    [newTitle, newPriority, newDeadline],
  );
  const handleDeleteTask = useCallback(() => {
    deleteTask({ variables: { where: { id } } });
  }, []);

  return (
    <WrapperStyled>
      <TitleStyled>Название</TitleStyled>
      {isChangeTask ? (
        <InputStyled type="text" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
      ) : (
        <TextStyled>{title}</TextStyled>
      )}
      <TitleStyled>Приоритет</TitleStyled>
      {isChangeTask ? (
        <InputStyled type="number" value={newPriority} onChange={({ target }) => setNewPriority(target.value)} />
      ) : (
        <TextStyled>{priority}</TextStyled>
      )}
      <TitleStyled>Дедлайн</TitleStyled>
      {isChangeTask ? (
        <InputStyled type="date" value={newDeadline} onChange={({ target }) => setNewDeadLine(target.value)} />
      ) : (
        <TextStyled>{deadline}</TextStyled>
      )}
      {isChangeTask ? (
        <ButtonStyled type="button" onClick={handleChangeTask}>
          Сохранить
        </ButtonStyled>
      ) : (
        <ButtonStyled type="button" onClick={() => setChangeTask(true)}>
          Редактировать задачу
        </ButtonStyled>
      )}
      <ButtonStyled type="button" onClick={handleDeleteTask}>
        Удалить задачу
      </ButtonStyled>
    </WrapperStyled>
  );
}

export default TaskCard;
