import React from 'react';
import styled from 'styled-components';

import { IoSave } from "react-icons/io5";

import { 
    colors,
} from 'common'

export const SaveButton = props => {
    return (
        <Button
            {...props}
            type="submit"
        >
            <IoSave 
                size={22} 
                color={colors.primary_light}
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

    img {
        width: 100%;
        height: 100%;
        object-fit: containe;
    }

    &:hover {
        cursor: pointer;
    }
`