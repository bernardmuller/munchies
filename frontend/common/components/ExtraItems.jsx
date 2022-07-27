import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Text,
  Button,
  Input,
  SaveButton,
  CancelButton,
} from 'common/components';
import { colors, FontSizes } from 'common';
import {
  IoEllipsisVerticalSharp,
  IoCheckboxOutline,
  IoCheckbox,
} from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { addExtraItem } from 'api';
import { checkItem, unCheckItem } from 'api/itemActions';
import { getCookie } from 'cookies-next';
import { Loader } from './loader';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 0 0.5rem 0;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
`;

const UtilityWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  padding-top: 0.5rem;
`;

const ItemName = styled.span`
  text-decoration: ${props => (props.checked ? 'line-through' : '')};
  color: ${colors.grey};
  margin-left: 0.5rem;
`;

const ItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ItemWrapper = styled.li`
  outline: none;
  border: none;
  background: none;
  width: 100%;
  height: 2.5rem;
  padding: 0.3rem 1rem;
  display: flex;
  border-radius: 4px;
  align-items: center;
  box-shadow: ${props =>
    props.checked ? null : 'rgba(0, 0, 0, 0.16) 0px 1px 4px'};
  background-color: ${props =>
    props.checked ? colors.secondary : colors.secondary_light};
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

const OptionsMenu = () => {
  return (
    <MenuContainer>
      <MenuButton inline>Rename</MenuButton>
      <MenuButton inline>Edit</MenuButton>
      <MenuButton inline style={{ color: 'red' }}>
        Delete
      </MenuButton>
    </MenuContainer>
  );
};

const Item = ({ item }) => {
  const [hover, setHover] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [checked, setChecked] = useState(false);
  const token = getCookie('token');

  const handleCheck = async itemData => {
    setChecked(prev => !prev);
    if (itemData.check) {
      unCheckItem(item._id, token);
    } else {
      checkItem(itemData._id, token);
    }
  };

  useEffect(() => {
    if (item.check) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    return () => {};
  }, []);

  return (
    <ItemWrapper checked={checked}>
      {checked ? (
        <IoCheckbox
          color={colors.primary}
          onClick={() => handleCheck(item)}
          size={22}
        />
      ) : (
        <IoCheckboxOutline
          color={colors.grey_light}
          onClick={() => handleCheck(item)}
          size={22}
        />
      )}
      <ItemName
        fontSize={FontSizes.Small}
        color={colors.grey}
        margin="0 0 0 0.5rem"
        checked={checked}
      >
        {item.name || 'item name'}
      </ItemName>

      {hover && (
        <UtilButton onClick={() => setShowMenu(prev => !prev)}>
          <IoEllipsisVerticalSharp size={22} color={colors.white} />
          {showMenu && <OptionsMenu onMouseOff={() => setShowMenu(false)} />}
        </UtilButton>
      )}
    </ItemWrapper>
  );
};

const AddItem = ({ menuId, onReload }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [add, setAdd] = useState(false);
  const token = getCookie('token');
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    setLoading(true);
    await addExtraItem(menuId, data, token)
      .then(() => onReload())
      .finally(() => {
        setLoading(false);
        reset();
      });
  };

  return (
    <Wrapper>
      {!add ? (
        <Button inline onClick={() => setAdd(true)}>
          <Text fontSize={FontSizes.Small} color={colors.grey_dark}>
            + Add item
          </Text>
        </Button>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            height="2rem"
            width=""
            placeholder="Item Name"
            {...register('name', {})}
          />
          <UtilityWrapper>
            {loading ? <Loader spinnerColor={colors.grey} /> : <SaveButton />}

            <CancelButton onClick={() => setAdd(false)} />
          </UtilityWrapper>
        </Form>
      )}
    </Wrapper>
  );
};

export const ExtraItems = ({ name, menuId, extraItems, onReload }) => {
  return (
    <Container>
      <Text
        fontSize={FontSizes.Small}
        color={colors.white}
        margin="0 0 0.6rem 0"
        padding="0.5rem 0"
        style={{ borderBottom: `1px solid ${colors.grey}` }}
      >
        {name}
      </Text>
      <ItemsContainer>
        {extraItems.map(item => (
          <Item key={item + Math.random()} item={item} />
        ))}
        <AddItem menuId={menuId} onReload={onReload} />
      </ItemsContainer>
    </Container>
  );
};
