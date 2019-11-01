import React, { useState, useCallback } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { hot } from 'react-hot-loader/root';

import { client } from './client';
import Layout from 'Components';
import SwithBtn from 'Components/SwitchButton';
import { secondatyTheme, defaultTheme } from 'themes';
import SwitchBtn from 'Components/SwitchButton';

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
        <SwitchBtn handleClick={handleTheme} />
        <Layout />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default hot(App);
