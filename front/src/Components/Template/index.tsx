import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { formattingDate } from 'helpers';
import CREATE_TASK from './gql/createTask.gql';

import { WrapperStyled, TitleStyled, InputStyled, ButtonStyled } from './styles';
import { CreateTaskMutationProps } from './types';

function Template() {
  const [createTask] = useMutation<CreateTaskMutationProps>(CREATE_TASK, {
    refetchQueries: ['getTasks'],
  });
  const [title, setTitle] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const handleChange = useCallback(
    async () => {
      await createTask({
        variables: {
          data: {
            title,
            priority: +priority,
            deadline: date,
          },
        },
      });
      setTitle('');
      setPriority('');
      setDate('');
    },
    [title, priority, date],
  );

  return (
    <WrapperStyled>
      <TitleStyled>Название</TitleStyled>
      <InputStyled type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
      <TitleStyled>Приоритет</TitleStyled>
      <InputStyled type="number" value={priority} onChange={({ target }) => setPriority(target.value)} />
      <TitleStyled>Дедлайн</TitleStyled>
      <InputStyled type="date" value={date} onChange={({ target }) => setDate(formattingDate(target.value))} />
      <ButtonStyled type="button" onClick={handleChange}>
        Создать задачу
      </ButtonStyled>
    </WrapperStyled>
  );
}

export default Template;
