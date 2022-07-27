import React from 'react';
import styled from 'styled-components';

import { IoClose } from "react-icons/io5";

import { 
    colors,
} from 'common'

export const CancelButton = props => {
    return (
        <Button
            {...props}
            type="button"
            onClick={() => props.onClick()}
        >
            <IoClose 
                size={28} 
                color={props.color || colors.grey_light}
            />
        </Button>
    )
};

const Button = styled.button`
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
    border-radius: 50%;
    border: none;
    background: none;
    margin: ${props => props.margin || ""};
    padding-top: 6px;

    img {
        width: 100%;
        height: 100%;
        object-fit: containe;
    }

    &:hover {
        cursor: pointer;
    }
`