import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { formattingDate } from 'helpers';
import CREATE_TASK from './gql/createTask.gql';

import { WrapperStyled } from './styles';
import { CreateTaskMutationProps } from './types';

import Input from 'Components/Input';
import Button from 'Components/Button';
import Label from 'Components/Label';

function Template() {
  const [title, setTitle] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);

  const [createTask] = useMutation<CreateTaskMutationProps>(CREATE_TASK, {
    refetchQueries: ['getTasks', 'getTasksCount'],
    variables: {
      data: {
        title,
        priority: +priority,
        deadline: date,
      },
    },
  });

  useEffect(
    () => {
      if (!valid && title.length && +priority > 0 && date.length) {
        setValid(true);
      } else if (valid) {
        setValid(false);
      }
    },
    [date, priority, title],
  );

  const handleCreateTask = useCallback(
    async () => {
      if (!valid) {
        return window.alert('Заполните, пожалуйста, все поля для создания новой задачи');
      }
      await createTask();
      setTitle('');
      setPriority('');
      setDate('');
    },
    [title, priority, date, valid],
  );

  const handleChange = useCallback(
    (fieldName: string) => ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (fieldName === 'title') {
        setTitle(value);
      } else if (fieldName === 'date') {
        setDate(formattingDate(value));
      } else {
        const newPriority = +value;
        if ((newPriority <= 9 && newPriority > 0) || value === '') {
          setPriority(value);
        }
      }
    },
    [priority],
  );

  return (
    <WrapperStyled>
      <Label htmlFor="title">Название</Label>
      <Input type="text" id="title" value={title} onChange={handleChange('title')} />
      <Label htmlFor="priority">Приоритет</Label>
      <Input
        id="priority"
        type="number"
        min="1"
        max="9"
        placeholder="число от 1 до 9"
        value={priority}
        onChange={handleChange('priority')}
      />
      <Label htmlFor="date">Дедлайн</Label>
      <Input id="date" type="date" value={date} onChange={handleChange('date')} />
      <Button onClick={handleCreateTask}>Создать задачу</Button>
    </WrapperStyled>
  );
}

export default Template;
