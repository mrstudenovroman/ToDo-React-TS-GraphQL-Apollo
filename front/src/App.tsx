import React, { useState, useCallback } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { hot } from 'react-hot-loader/root';
import { secondatyTheme, defaultTheme } from 'themes';

import Layout from 'Components';

import { client } from './client';

const InjectGlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
      font-family: Rubik, sans-serif;
    }

    body {
        margin: 0;
    }
`;

function App() {
  const [mainTheme, themeToggle] = useState(false);

  const handleTheme = useCallback(
    () => {
      themeToggle(!mainTheme);
    },
    [mainTheme],
  );

  return (
    <ThemeProvider theme={mainTheme ? defaultTheme : secondatyTheme}>
      <ApolloProvider client={client}>
        <InjectGlobalStyle />
        <Layout handleTheme={handleTheme} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default hot(App);
