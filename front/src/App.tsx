import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { createGlobalStyle } from "styled-components";
import { hot } from "react-hot-loader/root";

import { client } from "./client";
import Layout from "Components";

const InjectGlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
      font-family: Rubik, sans-serif;
    }

    body {
        margin: 0;
    }
`;

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <InjectGlobalStyle />
        <Layout />
      </ApolloProvider>
    );
  }
}

export default hot(App);
