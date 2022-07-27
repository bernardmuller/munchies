import React, { 
    useState,
} from 'react';

import {
    FontSizes,
    colors,
} from 'common';

import styled from 'styled-components';


const DropdownMenu = styled.select`
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "4rem"};
    border-radius: 10px;
    border: 1px solid ${colors.grey_light};
    padding-left: 0.7rem;
    padding-right: 1rem;
    font-size: ${props => props.fontSize};
    margin: ${props => props.margin || "0"};
    color: black;

    &:hover {
        cursor: pointer;
    };

    option {
        width: 80%;
    };

`

export const Dropdown = ({heading, options, onOptionChange, margin, height, width, value}) => {
    const [optionsList, setOptionsList] = useState(options);

    const List = optionsList.map((option) => (

        <option 
            value={option.name || option} 
        >

            {option.name || option}

        </option>

    ));

    const handleChange = (e) => {
        onOptionChange(e.target.value)
    }

    return (
        <DropdownMenu
            onChange={handleChange}
            fontSize={FontSizes.Small}
            margin={margin}
            height={height}
            width={width}
            value={value}
        >

            <option 
                value=""
            >
                {heading}
            </option>

            {List}

        </DropdownMenu>
    )
};

