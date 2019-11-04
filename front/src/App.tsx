import React, { useState, useCallback } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { hot } from 'react-hot-loader/root';
import { secondaryTheme, defaultTheme } from 'themes';

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
  
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

function App() {
  const [mainTheme, themeToggle] = useState(true);

  const handleTheme = useCallback(
    () => {
      themeToggle(!mainTheme);
    },
    [mainTheme],
  );

  return (
    <ThemeProvider theme={mainTheme ? defaultTheme : secondaryTheme}>
      <ApolloProvider client={client}>
        <InjectGlobalStyle />
        <Layout handleTheme={handleTheme} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default hot(App);
