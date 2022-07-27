import { IoFastFood, IoCalendar, IoSettingsSharp } from 'react-icons/io5';
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { colors } from 'common';
import { DeviceMediaQueries } from 'common/device';
import { ActiveViewContext } from 'contexts/ActiveViewContext';
import { NavOption } from './components/NavOption';

const NavContainer = styled.div`
  display: flex;
  bottom: 0;
  height: 5.5rem;
  min-height: 5.5rem;
  z-index: 900;
  background-color: ${colors.secondary_dark};

  @media ${DeviceMediaQueries.laptop} {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    width: 100px;
    min-width: 4rem;
    max-width: 4rem;
    min-height: 100%;
    z-index: 99;
    height: 100%;
  } ;
`;

const NavOptions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;

  @media ${DeviceMediaQueries.laptop} {
    flex-direction: column;
    height: 25%;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
  }
`;

const Settings = styled.div`
  display: none;
  button {
    background: none;
    border: none;
  }
  @media ${DeviceMediaQueries.laptop} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }
`;

export const Nav = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [mealsActive, setMealsActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);

  const activeContext = useContext(ActiveViewContext);
  const { active } = activeContext.state;

  useEffect(() => {
    if (active === 'MENUS') {
      setMenuActive(true);
    } else {
      setMenuActive(false);
    }
    if (active === 'MEALS') {
      setMealsActive(true);
    } else {
      setMealsActive(false);
    }
    if (active === 'PROFILE') {
      setProfileActive(true);
    } else {
      setProfileActive(false);
    }
  }, [active]);

  return (
    <NavContainer>
      <NavOptions>
        <NavOption
          title="My Menus"
          Icon={IoCalendar}
          path="/menus"
          active={menuActive}
        />

        <NavOption
          title="My Meals"
          Icon={IoFastFood}
          path="/meals"
          active={mealsActive}
        />

        <NavOption
          title="Settings"
          Icon={IoSettingsSharp}
          path="/settings"
          active={profileActive}
        />
      </NavOptions>
    </NavContainer>
  );
};
