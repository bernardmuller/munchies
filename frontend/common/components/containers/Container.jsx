import React from 'react';
import styled from 'styled-components';
import { colors } from 'common';
import { DeviceMediaQueries } from 'common/device';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;

  @media ${DeviceMediaQueries.laptop} {
    flex-direction: row;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: ${colors.secondary};
`;

const ContentCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const PageContainer = ({ children }) => {
  return <Page>{children}</Page>;
};

export const ContentContainer = ({ children }) => {
  return <Content props>{children}</Content>;
};

export const ContentCenterContainer = ({ children }) => {
  return <ContentCenter>{children}</ContentCenter>;
};
