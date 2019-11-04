import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { formattingDate } from 'helpers';
import UPDATE_TASK from './gql/updateTask.gql';
import DELETE_TASK from './gql/deleteTask.gql';

import { WrapperStyled, TextStyled } from './styles';
import { TaskCardProps } from './types';

import Input from 'Components/Input';
import Button from 'Components/Button';
import Label from '../Label';

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
      <Label htmlFor={`title-${id}`}>Название</Label>
      {changeTask ? (
        <Input id={`title-${id}`} type="text" value={newTitle} onChange={handleChange('title')} />
      ) : (
        <TextStyled>{title}</TextStyled>
      )}
      <Label htmlFor={`priority-${id}`}>Приоритет</Label>
      {changeTask ? (
        <Input
          id={`priority-${id}`}
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
      <Label htmlFor={`date-${id}`}>Дедлайн</Label>
      {changeTask ? (
        <Input id={`date-${id}`} type="date" value={newDate} onChange={handleChange('date')} />
      ) : (
        <TextStyled>{formatDate}</TextStyled>
      )}
      {changeTask ? (
        <Button onClick={handleUpdateTask}>Сохранить</Button>
      ) : (
        <Button onClick={handleToggleChangeTask}>Редактировать задачу</Button>
      )}
      <Button onClick={handleDeleteTask}>Удалить задачу</Button>
    </WrapperStyled>
  );
}

export default TaskCard;
