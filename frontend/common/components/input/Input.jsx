import styled from 'styled-components';

import {
    FontSizes,
    colors,
} from 'common';


export const Input= styled.input`
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "3rem"};
    border: ${props => props.error ? `1px solid red` : `1px solid ${colors.grey}`};
    border-radius: ${props => props.borderRadius || "10px"};
    font-size: ${FontSizes.Small};
    padding: ${props => props.padding || "0 1rem 0 1rem"};
    margin: ${props => props.margin || "0"};
    font-family: ${props => props.fontFamily || "arial"};
    grid-area: ${props => props.gridArea || ""};
    background-color: ${props => props.backgroundColor || colors.white};

    &:-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    ::placeholder { 
        color: ${props => props.error ? `red` : colors.grey};
        opacity: 0.7; /* Firefox */
    }

    &:active{
        border: none;
    }

    &:focus {
        outline: 2px solid ${colors.primary};
    }
`

export const TextArea = styled.textarea`
    width: 100%;
    max-width: 100%;
    border-radius: ${props => props.borderRadius || "10px"};
    border: ${props => props.error ? `1px solid red` : `1px solid ${colors.grey}`};
    padding: ${props => props.padding || "1rem 0.9rem"};
    font-size: ${props => props.fontSize || FontSizes.Small};
    resize: ${props => props.resize || "vertical"};
    grid-area: ${props => props.gridArea || ""};
    font-family: ${props => props.fontFamily || "arial"};

    ::placeholder { 
        color: ${props => props.error ? `red` : colors.lightGrey};
        opacity: 1; /* Firefox */
    }
`