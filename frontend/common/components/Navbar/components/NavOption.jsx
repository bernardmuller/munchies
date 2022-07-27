import React from 'react';
import styled from 'styled-components';

// import {
//     useHistory
// } from 'react-router';

import { colors } from 'common';

import { IconContext } from 'react-icons';
import { useRouter } from 'next/router';

const NavOptionContainer = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => (props.active ? colors.white : colors.primary)};
  cursor: pointer;
  text-decoration: none;
  margin: 0;
  transition: color ease-in 125ms;
  width: 100%;
`;

const NavIcon = styled.div`
  padding: 15% 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${props =>
    props.active ? colors.white : colors.secondary};
  border-radius: 1rem 0 0 1rem;

  span {
    z-index: 0;
    opacity: 0;
    position: absolute;
    color: ${colors.black};
    left: 0;
    margin-left: 2.5rem;
    transition: opacity 400ms ease-in-out;
    transition: margin-left 200ms;
    background-color: whitesmoke;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 16px;
    font-weight: 400;
  }
`;

const IconContianer = styled.button`
  padding: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.active ? colors.primary : colors.secondary_light};
  border-radius: 0.75rem;
  box-shadow: ${props =>
    props.active ? `rgba(104, 191, 80, 0.60) 0px 5px 15px` : ``};
`;

export const NavOption = ({ Icon, path, active }) => {
  // const history = useHistory();
  const router = useRouter();
  return (
    <NavOptionContainer active={active} onClick={() => router.push(path)}>
      <IconContext.Provider value={{ size: '26px' }}>
        {
          Icon && (
            // <NavIcon
            //     title={title}
            //     active={active}
            // >
            // <></>
            <IconContianer active={active}>
              <Icon />
            </IconContianer>
          )
          // <span>{title}</span>
          // </NavIcon>
        }
      </IconContext.Provider>
    </NavOptionContainer>
  );
};
