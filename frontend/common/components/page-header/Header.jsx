import React from 'react';
import styled from 'styled-components';
import { Text, Loader } from 'common/components';
import { colors, FontSizes } from 'common';

const HeaderContainer = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  z-index: 1;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
`;

const HeaderButton = styled.button`
  background: none;
  border: none;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
`;

export const Header = ({
  RightIcon,
  LeftIcon,
  loading,
  heading,
  onRightButtonClick,
  onLeftButtonClick,
}) => {
  return (
    <HeaderContainer>
      <LeftContainer>
        {LeftIcon && (
          <HeaderButton onClick={() => onLeftButtonClick()}>
            <LeftIcon size="35px" color={colors.white} />
          </HeaderButton>
        )}
      </LeftContainer>
      <Text color={colors.grey_dark} fontSize={FontSizes.Regular}>
        {loading ? (
          <Loader spinnerColor={colors.white} size="22px" />
        ) : (
          heading || 'MUNCHIES'
        )}
      </Text>
      <RightContainer>
        {RightIcon && (
          <HeaderButton onClick={() => onRightButtonClick()} disabled={loading}>
            <RightIcon size="30px" color={colors.white} />
          </HeaderButton>
        )}
      </RightContainer>
    </HeaderContainer>
  );
};
