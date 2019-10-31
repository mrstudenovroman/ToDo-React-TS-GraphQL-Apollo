import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { createGlobalStyle } from "styled-components";
import { hot } from "react-hot-loader/root";

import { client } from "./client";
import Task from "Components/Task";

const InjectGlobalStyle = createGlobalStyle`
    body {
        font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0;
    }
`;

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <InjectGlobalStyle />
        <Task />
      </ApolloProvider>
    );
  }
}

export default hot(App);
