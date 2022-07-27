import { PrivateContainer } from 'common/hocs';
import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  background-color: rgb(0, 0, 0, 0.8);
`;

const ScreenLoader = () => {
  return <LoaderContainer>loading</LoaderContainer>;
};

export default ScreenLoader;
