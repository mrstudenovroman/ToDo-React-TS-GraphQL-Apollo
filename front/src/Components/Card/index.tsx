import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { formattingDate } from 'helpers';
import UPDATE_TASK from './gql/updateTask.gql';
import DELETE_TASK from './gql/deleteTask.gql';

import { WrapperStyled, TitleStyled, TextStyled, InputStyled, ButtonStyled } from './styles';
import { TaskCardProps } from './types';

function TaskCard({ id, title, priority, deadline }: TaskCardProps) {
  const formatDate = useMemo(() => formattingDate(deadline), [deadline]);
  const [changeTask, setChangeTask] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newPriority, setNewPriority] = useState(priority);
  const [newDate, setNewDate] = useState(formatDate);
  const [valid, setValid] = useState<boolean>(true);

  const [deleteTask] = useMutation(DELETE_TASK, {
    variables: { where: { id } },
    refetchQueries: ['getTasks'],
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    variables: {
      where: { id },
      data: {
        title: newTitle,
        priority: +newPriority,
        deadline: newDate,
      },
    },
  });

  const handleToggleChangeTask = useCallback(() => setChangeTask(!changeTask), [changeTask]);

  const handleUpdateTask = useCallback(
    async () => {
      if (!valid) {
        return window.alert('Для изменения задачи все поля должны быть заполнены');
      }
      await updateTask();
      handleToggleChangeTask();
    },
    [newTitle, newPriority, newDate, valid],
  );

  useEffect(
    () => {
      if (!valid && newTitle.length && +newPriority > 0 && newDate.length) {
        setValid(true);
      } else if (valid && (!newTitle.length || +newPriority === 0 || !newDate.length)) {
        setValid(false);
      }
    },
    [newDate, newPriority, newTitle],
  );

  const handleChange = useCallback(
    (fieldName: string) => ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (fieldName === 'title') {
        setNewTitle(value);
      } else if (fieldName === 'date') {
        setNewDate(formattingDate(value));
      } else {
        const newPriority = +value;
        if ((newPriority <= 9 && newPriority > 0) || value === '') {
          setNewPriority(value);
        }
      }
    },
    [priority],
  );

  const handleDeleteTask = useCallback(() => {
    deleteTask();
  }, []);

  return (
    <WrapperStyled>
      <TitleStyled>Название</TitleStyled>
      {changeTask ? (
        <InputStyled type="text" value={newTitle} onChange={handleChange('title')} />
      ) : (
        <TextStyled>{title}</TextStyled>
      )}
      <TitleStyled>Приоритет</TitleStyled>
      {changeTask ? (
        <InputStyled
          type="number"
          min="1"
          max="9"
          placeholder="число от 1 до 9"
          value={newPriority}
          onChange={handleChange('priority')}
        />
      ) : (
        <TextStyled>{priority}</TextStyled>
      )}
      <TitleStyled>Дедлайн</TitleStyled>
      {changeTask ? (
        <InputStyled type="date" value={newDate} onChange={handleChange('date')} />
      ) : (
        <TextStyled>{formatDate}</TextStyled>
      )}
      {changeTask ? (
        <ButtonStyled type="button" onClick={handleUpdateTask}>
          Сохранить
        </ButtonStyled>
      ) : (
        <ButtonStyled type="button" onClick={handleToggleChangeTask}>
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
