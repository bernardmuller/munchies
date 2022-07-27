import React, { useState } from 'react';
import styled from 'styled-components';

import { Text, Button } from 'common/components';

import { colors, FontSizes } from 'common';

import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoEllipsisVerticalSharp,
} from 'react-icons/io5';

export const MenuGroup = props => {
  const menus = [
    { name: 'Menu 1' },
    { name: 'Menu 2' },
    { name: 'Menu 3' },
    { name: 'Menu 4' },
  ];
  const [expand, setExpand] = useState(false);
  return (
    <Container>
      <ButtonContainer
        type="button"
        onClick={() => setExpand(prev => !prev)}
        expand={expand}
      >
        <Text fontSize={FontSizes.Small} fontWeight="bold" fontFamily="Arial">
          Group name
        </Text>
        {expand ? (
          <IoChevronUpOutline size={24} />
        ) : (
          <IoChevronDownOutline size={24} />
        )}
      </ButtonContainer>
      {expand && (
        <ItemsContainer>
          {menus.map((item, index) => (
            <GroupItem key={index} />
          ))}
        </ItemsContainer>
      )}
    </Container>
  );
};

const GroupItem = props => {
  const [hover, setHover] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Item
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {}}
    >
      <Text fontSize={FontSizes.Small}>Menu name</Text>
      {hover && (
        <UtilButton onClick={() => setShowMenu(prev => !prev)}>
          <IoEllipsisVerticalSharp size={22} />
          {showMenu && <OptionsMenu onMouseOff={() => setShowMenu(false)} />}
        </UtilButton>
      )}
    </Item>
  );
};

const OptionsMenu = props => {
  return (
    <MenuContainer onMouseLeave={() => props.onMouseOff()}>
      <MenuButton inline>Rename</MenuButton>
      <MenuButton inline>Edit</MenuButton>
      <MenuButton inline style={{ color: 'red' }}>
        Delete
      </MenuButton>
    </MenuContainer>
  );
};

const Container = styled.div`
  width: 100%;
  display: grid;
`;

const ButtonContainer = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 3%;
  outline: none;
  background: none;
  border: none;
  border-bottom: 1px solid ${colors.grey};
  border-top: 1px solid ${colors.grey};
`;

const ItemsContainer = styled.div`
  width: 100%;
  display: grid;
`;

const Item = styled.button`
  outline: none;
  border: none;
  background: ${colors.white};
  width: 100%;
  height: 2rem;
  padding: 0.3rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: ${colors.white_dark};
  }
`;

const UtilButton = styled.button`
  outline: none;
  border: none;
  background: none;
  position: relative;
`;

const MenuContainer = styled.div`
  position: absolute;
  width: 200px;
  background-color: ${colors.white};
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  display: grid;
  top: -0.1rem;
  right: -0.6rem; ;
`;

const MenuButton = styled.button`
  outline: none;
  border: none;
  background: none;
  width: 100%;
  padding: 0.3rem 0;
  &:hover {
    background-color: ${colors.white_dark};
  }
`;
