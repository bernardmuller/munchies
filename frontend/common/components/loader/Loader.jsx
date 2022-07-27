import
  React
from 'react';

import
  styled, {
  keyframes,
} from 'styled-components';

import {
  colors,
  FontSizes,
} from 'common';

const Animation = size => keyframes`
    0% {
    transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Container = styled.div`
  position: relative;
  margin: ${props => props.margin};
`;

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    :after {
        content: " ";
        display: block;
        width: ${props => props.size || "24px"};
        height: ${props => props.size || "24px"};
        margin: 2px;
        border-radius: 50%;
        border: 3px solid ${props => props.spinnerColor || colors.white};
        border-color: ${props => props.spinnerColor || colors.white} transparent ${props => props.spinnerColor || colors.white} transparent;
        animation: ${Animation} 1.2s linear infinite;
    }
`;

const Label = styled.div`
	position: absolute;
	bottom: 10px;
	font-size: ${FontSizes.Regular};
	font-weight: bold;
`;

export const Loader2 = props => (

  	<Container
    	margin={props.showLabel ? '0 0 30px 0' : '0'}>

		<LoadingContainer
      backgroundColor={props.backgroundColor || colors.White}
      spinnerColor={props.spinnerColor || colors.grey}
      size={props.size}
		/>

  	</Container>
  
);

export const Loader = props => (

  	<LdsRing
      {...props}
    ><div></div><div></div><div></div><div></div></LdsRing>
  
);

const LdsRing = styled.div`
	display: inline-block;
	position: relative;
	width: 20px;
	height: 20px;
  z-index: 101;
  color: grey;
  margin: ${props => props.margin || ""};

	div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 22px;
		height: 22px;
		/* margin: 2px; */
		border: 4px solid ${props => props.spinnerColor || colors.primary};
		border-radius: 50%;
		animation: ${Animation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: ${colors.grey_light} transparent transparent transparent;
  	}

	div:nth-child(1) {
		animation-delay: -0.45s;
	}

	div:nth-child(2) {
		animation-delay: -0.3s;
	}

	div:nth-child(3) {
		animation-delay: -0.15s;
	}
`
