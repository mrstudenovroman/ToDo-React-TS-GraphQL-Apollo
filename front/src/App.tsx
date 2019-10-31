import React, { Fragment } from "react";
import { createGlobalStyle } from "styled-components";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

const InjectGlobalStyle = createGlobalStyle`
    body {
        font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0;
    }
`;

const Test = styled.h1`
  margin: 50vh auto 0 auto;
  text-align: center;
`;

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <InjectGlobalStyle />
        <Test>Не спать!</Test>
      </Fragment>
    );
  }
}

export default hot(App);
