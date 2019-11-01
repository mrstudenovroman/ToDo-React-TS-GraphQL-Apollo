import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import GET_TASK from "./graphql/getTask.gql";

const StyledContainer = styled.div`
  display: flex;
`;

function Task(): JSX.Element {
  const { data, loading, error } = useQuery(GET_TASK, {
    variables: { id: "5dbb114924aa9a000765fadb" }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;

  return <StyledContainer>{data.task.id && data.task.title}</StyledContainer>;
}

export default Task;
