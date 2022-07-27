import React, { useState, useContext, useEffect } from 'react';

import styled from 'styled-components';

import { ActiveViewContext } from 'contexts/ActiveViewContext';

import { colors, Images, FontSizes } from 'common';

import { IoMenuOutline, IoClose } from 'react-icons/io5';

import { DeviceMediaQueries } from 'common/device';

// import {
//   Routes
// } from 'navigation'

// import {
//   Link,
//   useHistory
// } from 'react-router-dom'

// import {
//   ActiveViewContext
// } from "contexts/ActiveViewContext";

import {
  IoFastFood,
  IoCalendar,
  IoSearch,
  IoPersonCircle,
  IoChatbubble,
  IoLogOut,
  IoSettingsSharp,
  IoLogIn,
  IoHomeSharp,
  IoToday,
  IoPersonSharp,
} from 'react-icons/io5';

import { H3 } from 'common/components';

const MasterContainer = styled.div`
  height: 100vh;
  position: relative;
  z-index: 80;
  position: fixed;
  background: none;

  @media ${DeviceMediaQueries.laptop} {
    width: 80px;
    background-color: ${colors.secondary};
    z-index: 100;
  }
`;

const Container = styled.div`
  height: 100%;
  position: fixed;
  width: 300px;
  background-color: ${props =>
    props.sideBarCollapsed ? '' : colors.secondary};
  background: ${props => (props.sideBarCollapsed ? 'none' : '')};
  pointer-events: ${props => (props.sideBarCollapsed ? 'none' : '')};
  z-index: 999;
  left: ${props => (props.sideBarCollapsed ? '-350px' : '0')};
  transition: all 0.35s ease-in-out;
  padding: 0.3rem 0 0 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-height: 850px) {
    overflow-y: scroll;
    overflow-x: hidden;
  }

  @media ${DeviceMediaQueries.laptop} {
    width: 80px;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
    background-color: ${colors.secondary};
    pointer-events: ${props => (props.sideBarCollapsed ? 'none' : '')};
    z-index: 999;
    left: 0;
  }
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 1rem;

  & > h3 {
    @media ${DeviceMediaQueries.tablet} {
      display: none;
    }
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  pointer-events: auto;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 1025px) {
    display: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 600;
  display: ${props => (props.sideBarCollapsed ? 'none' : 'inline')};
`;

export const Sidebar = props => {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(true);

  useEffect(() => {
    setSideBarCollapsed(props.collapsed);
  }, [props.collapsed]);

  return (
    <MasterContainer>
      <Overlay
        onClick={() => props.onClose()}
        sideBarCollapsed={sideBarCollapsed}
      />
      <Container sideBarCollapsed={sideBarCollapsed}>
        <Head>
          <H3 fontSize={FontSizes.Smaller} color={colors.primary_dark}>
            Munchies
          </H3>

          <MenuButton onClick={() => props.onClose()}>
            <IoClose size="35px" color="white" />
          </MenuButton>
        </Head>

        <Body sideBarCollapsed={sideBarCollapsed}>
          <NavOptions />
        </Body>
      </Container>
    </MasterContainer>
  );
};

const GroupContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const NavOptions = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [mealsActive, setMealsActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [settingsActive, setSettingsActive] = useState(false);

  const activeContext = useContext(ActiveViewContext);
  const active = activeContext.state.active;

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

    if (active === 'SETTINGS') {
      setSettingsActive(true);
    } else {
      setSettingsActive(false);
    }
  }, [active]);

  return (
    <GroupContainer>
      <NavOption
        Icon={IoCalendar}
        // link={Routes.dashboard.path}
        active={menuActive}
        name="My Menus"
      />
      <NavOption
        Icon={IoFastFood}
        // link={Routes.dashboard.path}
        active={mealsActive}
        name="My Meals"
      />
      <NavOption
        Icon={IoPersonSharp}
        // link={Routes.dashboard.path}
        active={profileActive}
        name="My Profile"
      />
    </GroupContainer>
  );
};

// Nav Option Item

const NavOptionContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-left: ${props => (props.active ? `6px solid ${colors.primary}` : ' ')};
  border-right: ${props =>
    props.active ? `6px solid ${colors.secondary}` : ' '};
  margin-bottom: 0.5rem;
  color: ${props => (props.active ? `black` : 'grey')};
  padding: 0 0 0 1rem;
  gap: 0.5rem;

  &:hover {
    cursor: pointer;
  }

  @media ${DeviceMediaQueries.laptop} {
    padding: 0 0 0 2rem;
    justify-content: center;
    height: 40px;
    padding: 0;
    min-width: 100%;
  }
`;

const RouteName = styled.span`
  display: inline;
  font-size: ${FontSizes.Small};
  color: ${props => (props.active ? colors.white : colors.grey_dark)};

  @media ${DeviceMediaQueries.laptop} {
    display: none;
  }
`;

const NavOption = ({ Icon, link, active, name }) => {
  return (
    // <div
    // 	style={{ color: `${colors.primary}`, textDecoration: "none" }}
    // >
    <NavOptionContainer active={active}>
      {/* <IconContainer routeName={name}> */}
      {Icon && <Icon size="30px" color={active ? 'White' : 'grey'} />}
      {/* </IconContainer> */}

      <RouteName active={active}>{name}</RouteName>
    </NavOptionContainer>
    // </div>
  );
};
